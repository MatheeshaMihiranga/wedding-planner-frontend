import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import {
  Checkbox,
  Grid,
  Icon,
  Message,
  MessageHeader,
} from "semantic-ui-react";

export const LoadContentByMonth = ({
  getCheckListDetails,
  updateCheckListDetails,
  setVisibleDeleteModal,
  setDeleteData,
}: any) => {
  return (
    <Grid className="userCheckListMain">
      {getCheckListDetails.length > 0 ? (
        getCheckListDetails.map((currentData: any, index: any) => {
          return (
            <Grid.Column
            key={index}
            computer={16}
            tablet={16}
            mobile={16}
            className="userCheckListDataViewMain"
          >
            <p>{currentData?.monthRange}</p>
            {currentData.categoryData.map((checklistData: any) => {
              return (
                <Grid className="contentView">
                  <Grid.Column
                    computer={10}
                    tablet={16}
                    mobile={16}
                    className="userChecklistCheckboxMain"
                  >
                    <Checkbox
                      checked={checklistData.status}
                      onChange={(e, data) =>
                        updateCheckListDetails(data, checklistData)
                      }
                      label={checklistData?.name}
                    />
                  </Grid.Column>
                  <Grid.Column
                    computer={6}
                    tablet={16}
                    mobile={16}
                    className="checklistDelete"
                  >
                    <div>
                      <Icon
                        onClick={() => {
                          setVisibleDeleteModal(true);
                          setDeleteData(checklistData);
                        }}
                        size="large"
                        name="delete calendar"
                      />
                    </div>
                  </Grid.Column>
                </Grid>
              );
            })}
          </Grid.Column>
           
            // <Grid.Column
            //   key={index}
            //   computer={16}
            //   tablet={16}
            //   mobile={16}
            //   className="userCheckListDataViewMain"
            // >
            //   <Grid className="contentView">
            //     <Grid.Column
            //       computer={10}
            //       tablet={16}
            //       mobile={16}
            //       className="userChecklistCheckboxMain"
            //     >
            //       <Checkbox
            //         checked={currentData.status}
            //         onChange={(e, data) =>
            //           updateCheckListDetails(data, currentData)
            //         }
            //         label={currentData?.name}
            //       />
            //     </Grid.Column>
            //     <Grid.Column
            //       computer={6}
            //       tablet={16}
            //       mobile={16}
            //       className="checklistDelete"
            //     >
            //       <div>
            //         <Icon
            //           onClick={() => {
            //             setVisibleDeleteModal(true);
            //             setDeleteData(currentData);
            //           }}
            //           size="large"
            //           name="delete calendar"
            //         />
            //       </div>
            //     </Grid.Column>
            //   </Grid>
            // </Grid.Column>
          );
        })
      ) : (
        <Grid.Column computer={16}>
          <Message>
            <MessageHeader>Not Available Any CheckList</MessageHeader>
          </Message>
        </Grid.Column>
      )}
    </Grid>
  );
};
