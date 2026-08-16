import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useInputStore = defineStore(
  "input",
  (): {
    isConvertSucceed: Ref<boolean>;
    isConvertFailed: Ref<boolean>;
  } => {
    const isConvertSucceed = ref<boolean>(false);
    const isConvertFailed = ref<boolean>(false);

    return {
      isConvertSucceed,
      isConvertFailed,
    };
  },
);
