import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import React, { forwardRef, PropsWithRef } from 'react'
import ReactSelect, {
  Props as ReactSelectProps,
  components,
} from 'react-select'

export interface SelectInputProps
  extends ReactSelectProps,
    PropsWithRef<any> {
  isDisabled?: boolean
  isInvalid?: boolean
  isValid?: boolean
  propsExtra?: any
}

const SelectInput: React.FC<SelectInputProps> = forwardRef(
  (
    {
      isDisabled,
      isInvalid,
      isValid,
      propsExtra,
      name,
      isClearable = true,
      ...props
    },
    ref,
  ) => {
    const DropdownIndicator = (props: any) => {
      return (
        <components.DropdownIndicator {...props}>
          {props?.selectProps?.menuIsOpen ? (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="rotate-180 transition-transform duration-500"
            />
          ) : (
            <FontAwesomeIcon
              icon={faChevronDown}
              className="rotate-0 transition-transform duration-500"
            />
          )}
        </components.DropdownIndicator>
      )
    }

    return (
      <motion.div
        animate={isInvalid ? { x: [0, -6, 6, -6, 6, 0] } : {}}
        transition={{ duration: 0.4 }}
      >
        <ReactSelect
          key={`${name}_${(props.value as any)?.value}`}
          menuShouldBlockScroll={false}
          instanceId={name}
          ref={ref}
          inputId={name}
          {...props}
          {...propsExtra}
          isClearable={isClearable}
          isSearchable
          isMulti={props.isMulti}
          styles={{
            option: (styles) => ({ ...styles, fontSize: 14 }),
            singleValue: (styles) => ({ ...styles, fontSize: 14 }),
            placeholder: (styles) => ({
              ...styles,
              fontSize: 14,
              whiteSpace: 'nowrap',
            }),
            indicatorSeparator: (provided) => ({
              ...provided,
              display: 'none',
            }),
            indicatorsContainer: (styles) => ({
              ...styles,
              padding: '0px 8px',
            }),
            dropdownIndicator: (styles) => ({
              ...styles,
              padding: 0,
            }),
            container: () => ({
              position: 'relative',
              boxSizing: 'border-box',
              // zIndex: 3,
            }),
            menu: () => ({
              position: 'absolute',
              width: '100%',
              background: 'white',
              border: '1px solid #eee',
              top: 'calc(100% + 5px)',
              borderRadius: '10px',
              zIndex: 1,
            }),
            control: (provided, state) => ({
              ...provided,
              // paddingTop: '0.125rem',
              // paddingBottom: '0.125rem',
              borderRadius: '0.5rem',
              border: state.isFocused
                ? '2px solid #3b82f6'
                : state.isDisabled
                  ? '2px solid #e5e7eb'
                  : isInvalid
                    ? '2px solid #ee4620'
                    : isValid
                      ? '2px solid #49d475'
                      : '2px solid #000000',
              outline: 'none',
              boxShadow: '3px 3px 0px #000000',
              background: '#fffff',
            }),
            ...props.styles,
          }}
          menuPosition="absolute"
          menuShouldScrollIntoView={true}
          components={{ DropdownIndicator }}
        />
      </motion.div>
    )
  },
)

SelectInput.displayName = 'SelectInput'

export default SelectInput
