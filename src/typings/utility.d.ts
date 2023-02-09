/** 扩展TS的Utility Types集 */
declare namespace UT {
  type Nullable<T> = T | null;
  type Nullishable<T> = T | null | undefined;
  type MaybeRef<T> = import("vue").Ref<T> | T;
}
