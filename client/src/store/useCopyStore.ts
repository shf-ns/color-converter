import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useCopyStore = defineStore(
  "copy",
  (): {
    isCopySucceed: Ref<boolean>;
    isCopyFailed: Ref<boolean>;
    copy: (text: string) => Promise<void>;
  } => {
    let isCopySucceed = ref<boolean>(false);
    let isCopyFailed = ref<boolean>(false);

    const copy = async (text: string): Promise<void> => {
      try {
        isCopySucceed.value = true;
        await navigator.clipboard.writeText(text);
      } catch (error) {
        isCopyFailed.value = true;
        console.log(error);
      }
    };

    return {
      isCopySucceed,
      isCopyFailed,
      copy,
    };
  },
);
