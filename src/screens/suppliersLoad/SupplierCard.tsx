import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  Icon,
  Image,
} from "semantic-ui-react";

import "./supplierDetails.scss"
import { useNavigate } from "react-router-dom";

const SupplierViewCard = ({data}:any) => { 
    const navigate = useNavigate()       
  return (
    <div className="supplierCardData" onClick={()=>navigate(`/supplier/supplier-details/${data._id}`)}>
      <Card>
        <Image src={data?.images?.[0]} wrapped ui={false} />
        <CardContent>
          <CardHeader>{data?.supplierName || ""}</CardHeader>
          <CardDescription>
            {data?.description || ""}
          </CardDescription>
        </CardContent>
        <CardContent extra>
          <a>
            <Icon name="star" />
           {data?.rating || 0}
          </a>
        </CardContent>
      </Card>
    </div>
  );
};

export default SupplierViewCard;
