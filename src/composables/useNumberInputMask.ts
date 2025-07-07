import type { Directive } from 'vue'

export default (): Directive => ({
  beforeMount(el) {
    el.inputChange = function (event: MouseEvent) {
      (event.target as HTMLInputElement).value = (event.target as HTMLInputElement)?.value.replace(/[^0-9]/g, '')
    };
    document.addEventListener('input', el.inputChange);
  },
  unmounted(el) {
    document.removeEventListener('input', el.inputChange);
  }
});