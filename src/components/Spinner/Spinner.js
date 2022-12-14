import { PacmanLoader } from 'react-spinners'
import { PropTypes } from 'prop-types'

/**
 * types of spinners
 * https://www.davidhu.io/react-spinners/
 *
 * github
 * https://github.com/davidhu2000/react-spinners
 */

const Spinner = ({ color, size, isLoading, ...others }) => (
  <PacmanLoader color={color} size={size} loading={isLoading} {...others} />
)

Spinner.propTypes = {
  color: PropTypes.string,
  size: PropTypes.string,
  isLoading: PropTypes.bool,
}

Spinner.defaultProps = {
  color: 'black',
  size: '1.2rem',
  isLoading: false,
}

export default Spinner
