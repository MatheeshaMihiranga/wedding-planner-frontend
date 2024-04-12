import React from "react";

import { CommonRoutes } from "./commonRoutes";
import { SupplierRoutes } from "./supplierRoute";
import { UserRoutes } from "./userRoute";

export const MainRoutes = [
  {
    mainPath: "/",
    routes: CommonRoutes,
  },
  {
    mainPath: "/supplier",
    routes: SupplierRoutes,
  },
  {
    mainPath: "/user",
    routes: UserRoutes,
  }
];
