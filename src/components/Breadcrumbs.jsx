import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import Icons from "./Icons";

const Breadcrumbs = (props) => {
  const { params, routes } = props;

  const breadcrumbs = useBreadcrumbs(routes);
  return (
    <>
      <div className=" flex text-sm">
        {breadcrumbs
          .filter((el) => !el.match.route === false)
          .map(({ match, breadcrumb }, index, self) => (
            <div key={index} className="flex items-center">
              <NavLink
                className="group first-letter:uppercase hover:text-green-500"
                to={match.pathname}
              >
                <div>
                  <span className="capitalize ">{breadcrumb}</span>
                </div>
              </NavLink>
              {index !== self.length - 1 && (
                <Icons.IconChevronCompactRight className="group-hover:text-current" />
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Breadcrumbs;
