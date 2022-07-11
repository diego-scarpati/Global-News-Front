import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text,SectionList } from "react-native";
import { hrReviewLicense } from "../../../store/hr";
import SectionRender from "./SectionRender";

export default function Section() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const licencias = useSelector((state) => state.hr);
  
  useEffect(() => {
    dispatch(hrReviewLicense({id:user.id}));
  }, []);
                  
  return (
    <SectionList
      sections={[{ title: "Licencias", data: licencias }]}
      renderItem={({ item }) =>
        //arreglar esto
        (user.RRHH) && 
        <>
         <Text> </Text>
        {(item.bossApproval === "approved" && item.HRApproval === "pending")&&<SectionRender item={item} />}
        </>
        ||(user.positionId === 1 && item.user.positionId !== 4) && <SectionRender item={item}/>

         ||(user.positionId === 2 && item.user.positionId !== 1) &&<SectionRender item={item}/>

         ||(user.positionId === 3 && item.user.positionId === 4) &&<SectionRender item={item}/>
      }
      keyExtractor={(item) => item.id}
    />
  );
}
