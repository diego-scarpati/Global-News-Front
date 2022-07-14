import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Text, SectionList, SafeAreaView, ScrollView } from "react-native";
import SectionRender from "./SectionRender";

export default function BossSection({route}) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const licencias = useSelector((state) => state.hrLicenses);
  
  return (
    <ScrollView>
      <SafeAreaView>
      <SectionList
      sections={[{ title: "Licencias", data: licencias }]}
      renderItem={({ item }) =>
        
      item.HRApproval === "pending" && <SectionRender item={item} />
      }
      keyExtractor={(item) => item.id}
    />
      </SafeAreaView>
    </ScrollView>
  );
}

