import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, SectionList } from "react-native";
import { hrReviewLicense } from "../../../store/hr";
import SectionRender from "./SectionRender";

export default function Section() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const licencias = useSelector((state) => state.hr);

  useEffect(() => {
    dispatch(hrReviewLicense({ id: user.id }));
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
