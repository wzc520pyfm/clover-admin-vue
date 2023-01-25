import { useContext } from "@/hooks";
import type { Ref } from "vue";

type Step = 0 | 1 | 2 | 3;

interface Person {
  name: string;
  age: number;
  isLikeBasketball: boolean;
}

interface StepFormContext {
  step: Ref<Step>;
  person: Ref<Person>;
  setStep: (value: Step) => void;
  addStep: () => void;
}

const { useProvide: useStepFormProvide, useInject: useStepFormInject } =
  useContext<StepFormContext>();

export function useStepFormContext() {
  let step = $ref<Step>(0);
  const person = $ref({
    name: "",
    age: 18,
    isLikeBasketball: false,
  });

  const stepFormContext: StepFormContext = {
    step: $$(step),
    person: $$(person),
    setStep,
    addStep,
  };

  function setStep(value: Step) {
    step = value;
  }

  function addStep() {
    step++;
  }

  function useProvide() {
    return useStepFormProvide(stepFormContext);
  }

  return {
    useProvide,
    useInject: useStepFormInject,
  };
}
