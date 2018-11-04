import * as React from 'react'

/**
 * ColorButton properties.
 */
interface IColorButtonProps {
  /**
   * Buttons background color
   *
   * @default 'green'
   */
  color: 'blue' | 'green'
}

/** A button with a configurable background color. */
const ColorButton: React.SFC<IColorButtonProps> = props => (
  <button
    style={{
      padding: 40,
      color: '#eee',
      backgroundColor: props.color,
      fontSize: '2rem',
    }}
  >
    {props.children}
  </button>
)

export default ColorButton
