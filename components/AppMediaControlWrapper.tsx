import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../store/auth-slice";

type AppMediaControlWrapperProps = {
  children: React.ReactNode;
};

export default function AppMediaControlWrapper({
  children,
}: AppMediaControlWrapperProps) {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  return (
    <div className="absolute -top-1 w-full rounded-full transform -translate-y-1/2">
      <div
        className={`flex ${!isAuth ? "justify-start pl-5" : "justify-evenly"}`}
      >
        {children}
      </div>
    </div>
  );
}
