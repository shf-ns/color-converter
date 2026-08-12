import { ref, type Ref } from "vue";

export const useCopy = (): {
  isCopy: Ref<boolean>;
  copy: (text: string) => Promise<void>;
} => {
  const isCopy = ref<boolean>(false);

  const copy = async (text: string): Promise<void> => {
    try {
      isCopy.value = true;
      await navigator.clipboard.writeText(text);
      setTimeout(() => {
        isCopy.value = false;
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    isCopy,
    copy,
  };
};
