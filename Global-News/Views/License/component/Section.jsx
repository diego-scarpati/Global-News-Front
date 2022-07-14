import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, SectionList } from "react-native";
import { hrLicensesReviewLicense } from "../../../store/hrLicenses";
import SectionRender from "./SectionRender";

export default function Section() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const licencias = useSelector((state) => state.hrLicenses);

  useEffect(() => {
    dispatch(hrLicensesReviewLicense({ id: user.id }));
  }, []);

  return(
    <SectionList
      sections={[{ title: "Licencias", data: licencias }]}
      renderItem={({ item }) =>
        item.bossApproval === "approved" &&
        item.HRApproval === "pending" && <SectionRender item={item} />
      }
      keyExtractor={(item) => item.id}
    />
  ) 
}
