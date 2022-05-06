import { useContext } from "react";

import { AuthContext } from "./provider";

export const useUser = () => useContext(AuthContext);
