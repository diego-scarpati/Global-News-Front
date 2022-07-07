import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  SectionList,
  StatusBar,
  Button,
} from "react-native";
import {
  rrhhReviewLicense,
  rrhhChangeLicenseStatus,
} from "../../../store/license";
import SectionRender from "./SectionRender";

export default function Section() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const licencias = useSelector((state) => state.license);
  
  useEffect(() => {
    dispatch(rrhhReviewLicense({id:user.id}));
  }, []);

  return (
    <SectionList
      sections={[{ title: "Licencias", data: licencias }]}
      renderItem={({ item }) =>
        (user.RRHH && item.bossApproval === "approved" && item.HRApproval === "pending"
        && <SectionRender item={item} />)
        ||
        (user.positionId === 1 && item.user.positionId !== 4
        &&<SectionRender item={item}/>)
        || 
        (user.positionId === 2 && item.user.positionId !== 1
        &&<SectionRender item={item}/>)
        ||
        (user.positionId === 3 && item.user.positionId === 4
        &&<SectionRender item={item}/>)
      }
      keyExtractor={(item) => item.id}
    />
  );
}
