import {Field, useFormikContext, FieldProps} from 'formik'
import {NumericFormat} from 'react-number-format'

export const DynamicAttributesFields = ({attrField = 'attributes', prefilledFromDraft = false}) => {
  const {values} = useFormikContext<any>()
  const attrs = values[attrField] || {}

  if (!attrs || Object.keys(attrs).length === 0) {
    return <div className='text-center text-gray-600'>No attributes for this category.</div>
  }

  return (
    <div className='row'>
      {Object.entries(attrs).map(([attrKey, attrValue]) => {
        let inputType = 'text'
        if (attrKey.toLowerCase().includes('date')) inputType = 'date'
        if (attrKey.toLowerCase().includes('price')) inputType = 'number'
        if (attrKey.toLowerCase().includes('number')) inputType = 'number'

        const prefilled =
          prefilledFromDraft && attrValue !== '' && attrValue !== null && attrValue !== undefined

        if (attrKey.toLowerCase().includes('price')) {
          return (
            <div className='col-md-6 mb-3' key={attrKey}>
              <label>
                {attrKey.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
              </label>
              <Field name={`attributes.${attrKey}`}>
                {({field, form}: FieldProps) => (
                  <NumericFormat
                    className={`form-control ${
                      prefilled ? 'bg-success bg-opacity-10 border-success' : ''
                    }`}
                    thousandSeparator=','
                    decimalSeparator='.'
                    prefix='$'
                    decimalScale={2}
                    fixedDecimalScale={true}
                    allowNegative={false}
                    value={field.value ?? ''}
                    onValueChange={({floatValue}) => {
                      form.setFieldValue(field.name, floatValue ?? '')
                    }}
                  />
                )}
              </Field>
            </div>
          )
        }

        if (attrKey.toLowerCase().includes('number')) {
          return (
            <div className='col-md-6 mb-3' key={attrKey}>
              <label>
                {attrKey.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
              </label>
              <Field name={`attributes.${attrKey}`}>
                {({field, form}: FieldProps) => (
                  <NumericFormat
                    className={`form-control ${
                      prefilled ? 'bg-success bg-opacity-10 border-success' : ''
                    }`}
                    allowNegative={false}
                    decimalScale={0}
                    allowLeadingZeros={false}
                    value={field.value ?? ''}
                    onValueChange={({floatValue}) => {
                      form.setFieldValue(field.name, floatValue ?? '')
                    }}
                  />
                )}
              </Field>
            </div>
          )
        }

        return (
          <div className='col-md-6 mb-3' key={attrKey}>
            <label>
              {attrKey.replace(/([A-Z])/g, ' $1').replace(/^./, (s) => s.toUpperCase())}
            </label>
            <Field
              name={`attributes.${attrKey}`}
              type={inputType}
              className={`form-control ${
                prefilled ? 'bg-success bg-opacity-10 border-success' : ''
              }`}
            />
          </div>
        )
      })}
    </div>
  )
}
