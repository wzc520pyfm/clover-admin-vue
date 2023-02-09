/**
 * 责任链
 *  - 应用场景举例
 *   - 获取用户gps定位, 依次尝试使用浏览器api、高德api、微信api，只有成功获取就不再继续尝试
 *   - 表单校验， 依次检查 是否选择华为手机、是否选择限量款式、是否选择花呗分期， 检查通过则允许使用优惠券
 *   - 登录系统， 需要依次确认 配置1、配置2、配置3是否全部完成， 完成即可登录， 否则弹窗用户输入配置
 */
export abstract class ResponsibilitiesChain {
  protected next: ResponsibilitiesChain | null;
  protected handleAllResult: Array<any>;

  constructor() {
    this.next = null;
    this.handleAllResult = [];
  }

  public setNext(responsibilitiesChain: ResponsibilitiesChain) {
    this.next = responsibilitiesChain;
  }

  public handle(): any {
    // 第一种执行方式, 依次尝试链上的节点, 一旦能成功处理就返回
    if (this.canHandle()) {
      return this.doHandle();
    } else if (this.next) {
      return this.next.handle();
    } else {
      this.errHandle();
    }
  }
  public handleAll(): any {
    // 第二种执行方式, 依次尝试链上的节点, 全部尝试完才返回, 遇到失败则结束
    if (!this.canHandle()) {
      this.errHandle();
    }
    if (this.next) {
      this.doHandle();
      return this.next.handleAll();
    } else {
      return this.doHandle() ?? true; // 如果不需要自定义返回则默认返回true代表全链执行成功
    }
  }
  public handleAllSettled(): any {
    // 第三种执行方式, 依次尝试链上的节点, 全部尝试才返回且返回所有处理结果, 遇到失败则结束
    if (!this.canHandle()) {
      this.errHandle();
    }
    this.handleAllResult.push(this.doHandle());
    if (this.next) {
      return [...this.handleAllResult, ...this.next.handleAllSettled()];
    } else {
      return this.handleAllResult;
    }
  }

  public abstract canHandle(): boolean;

  public abstract doHandle(): any;

  public abstract errHandle(): any;
}

export class ResponsibilitiesChainNode extends ResponsibilitiesChain {
  private condition: () => boolean;
  private action?: UT.Nullable<() => any>;
  private errAction?: UT.Nullable<() => any>;

  constructor(
    condition: () => boolean,
    action?: UT.Nullable<() => any>,
    errAction?: UT.Nullable<() => any>
  ) {
    super();
    this.condition = condition;
    this.action = action;
    this.errAction = errAction;
  }

  public canHandle(): boolean {
    return this.condition();
  }
  public doHandle() {
    return this.action?.();
  }
  public errHandle() {
    return this.errAction?.() ?? new Error("处理失败");
  }
}

export class ResponsibilitiesChainBooleanNode extends ResponsibilitiesChain {
  private condition: () => boolean;
  private result: boolean;

  constructor(condition: () => boolean) {
    super();
    this.condition = condition;
    this.result = false;
  }

  public canHandle(): boolean {
    this.result = this.condition();
    return this.result;
  }
  public doHandle() {
    return this.result;
  }
  public errHandle() {
    return this.result;
  }
}

export class CustomChain {
  private head: ResponsibilitiesChain | null;
  private tail: ResponsibilitiesChain | null;

  constructor() {
    this.head = null;
    this.tail = null;
  }

  public append(chain: ResponsibilitiesChain) {
    if (!this.head) {
      this.head = chain;
      this.tail = chain;
      return;
    }
    this.tail?.setNext(chain);
    this.tail = chain;
  }

  execute() {
    if (!this.head) {
      throw new Error("ResponsibilitiesChain must be one chain");
    } else {
      return this.head.handle();
    }
  }
  executeAll() {
    if (!this.head) {
      throw new Error("ResponsibilitiesChain must be one chain");
    } else {
      return this.head.handleAll();
    }
  }
  executeAllSettled() {
    if (!this.head) {
      throw new Error("ResponsibilitiesChain must be one chain");
    } else {
      return this.head.handleAllSettled();
    }
  }
}

// // 真实场景举例: 获取定位
// // 依次尝试 gpsEdge gpsGaode gpsWx获取定位, 一旦成功获取就返回结果, 不再继续向后尝试
// const gpsChain = new CustomChain();
// const gpsEdge = new ResponsibilitiesChainNode(() => false, () => edge.location);
// const gpsGaode = new ResponsibilitiesChainNode(() => true, () => goode.location);
// const gpsWx = new ResponsibilitiesChainNode(() => true, () => wx.location);

// gpsEdge.setNext(gpsGaode);
// gpsGaode.setNext(gpsWx);

// gpsChain.append(gpsEdge);
// const gps = gpsEdge.handle();
