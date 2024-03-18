import React from "react";

import { CommonRoutes } from "./commonRoutes";
import { SupplierRoutes } from "./supplierRoute";

export const MainRoutes = [
  {
    mainPath: "/",
    routes: CommonRoutes,
  },
  {
    mainPath: "/supplier",
    routes: SupplierRoutes,
  }
];
