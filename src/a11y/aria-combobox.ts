export type AriaIds = {
  rootId: string;
  inputId: string;
  listboxId: string;
  labelId?: string;
  optionId: (index: number) => string;
};

export function createAriaIds(baseId: string, includeLabel = true): AriaIds {
  const rootId = baseId;
  const inputId = baseId + '-input';
  const listboxId = baseId + '-listbox';
  const labelId = includeLabel ? baseId + '-label' : undefined;
  return {
    rootId,
    inputId,
    listboxId,
    labelId,
    optionId: (i: number) => baseId + '-option-' + i,
  };
}

export type ComboboxA11y = {
  inputProps: (args: {
    expanded: boolean;
    activeIndex: number;
    disabled?: boolean;
  }) => Record<string, any>;
  listboxProps: () => Record<string, any>;
  optionProps: (index: number, selected: boolean) => Record<string, any>;
};

export function ariaCombobox(ids: AriaIds): ComboboxA11y {
  return {
    inputProps: ({ expanded, activeIndex, disabled }) => ({
      id: ids.inputId,
      role: 'combobox',
      'aria-controls': ids.listboxId,
      'aria-expanded': expanded,
      'aria-autocomplete': 'list',
      'aria-activedescendant': activeIndex >= 0 ? ids.optionId(activeIndex) : undefined,
      'aria-labelledby': ids.labelId,
      disabled,
    }),
    listboxProps: () => ({
      id: ids.listboxId,
      role: 'listbox',
      tabIndex: -1,
    }),
    optionProps: (index, selected) => ({
      id: ids.optionId(index),
      role: 'option',
      'aria-selected': selected,
    }),
  };
}

export default ariaCombobox;
