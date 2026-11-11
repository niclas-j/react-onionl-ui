export const SwitchProps = {
  modelValue: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'default',
  },
  checked: {
    type: Boolean,
    default: false,
  },
  beforeSwitch: {
    type: Function,
    default: () => Promise.resolve(true),
  },
}

export const SwitchEmits = {
  'update:modelValue': (value: boolean) => typeof value === 'boolean',
  change: (value: boolean) => typeof value === 'boolean',
  click: (value: boolean) => typeof value === 'boolean',
}
