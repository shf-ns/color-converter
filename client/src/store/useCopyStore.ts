import { defineStore } from "pinia";
import { ref, type Ref } from "vue";

export const useCopyStore = defineStore(
  "copy",
  (): {
    isCopy: Ref<boolean>;
    copy: (text: string) => Promise<void>;
  } => {
    const isCopy = ref<boolean>(false);

    const copy = async (text: string): Promise<void> => {
      try {
        isCopy.value = true;
        await navigator.clipboard.writeText(text);
      } catch (error) {
        console.log(error);
      }
    };

    return {
      isCopy,
      copy,
    };
  },
);
export default useCopyStore;
