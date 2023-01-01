import classnames from 'classnames';
import { Link, LinkProps, useMatch, useResolvedPath } from 'react-router-dom';

function CustomLink({ children, to, ...props }: LinkProps) {
  let resolved = useResolvedPath(to);
  let match = useMatch({ path: resolved.pathname, end: true });

  return (
    <Link
      className={classnames({ active: match ? true : false })}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
