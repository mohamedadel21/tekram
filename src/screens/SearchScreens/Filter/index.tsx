import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  FlatList
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import CategoryItem from "../../../components/CategoryItem";
import SearchInput from "../../../components/SearchInput";
import RecentSearchItem from "../../../components/RecentSearchItem";
import styles from "./styles";
import SortByItem from "../../../components/SortByItem";
import AppButton from "../../../components/AppButton";
import HomeHeader from "../../../components/Headers/HomeHeader";
import { ScaleWidth } from "../../../common/foundation";

const Filter = (props: any) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectItem, setSelectItem] = useState(null);
  const timeout = useRef(null);

  const filterList = [
    { name: t("filter.recommended"), icon: "smile" },
    { name: t("filter.popular"), icon: "heart" },
    { name: t("filter.rating"), icon: "star" }
  ]

  const onChangeTextSearch = (value: any) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setSearchQuery(value)
    }, 1000);
  }

  console.log("selectItem", selectItem)
  const onSubmitEditingSearch = () => {

  }

  const renderRestuarantMenuItem = ({ item, index }: { item: any, index: any }) => {
    return (
      <SortByItem
        name={item?.name}
        isSelected={item?.name == selectItem?.name}
        onPress={() => setSelectItem(item)}
        icon={item?.icon}
      />
    )
  }
  const renderCategoryItem = ({ item, index }: { item: any, index: any }) => {
    return (
      <CategoryItem
        imageUrl={"https://cdn-icons-png.flaticon.com/512/135/135578.png"}
        name={`item ${index}`}
        onPress={() => props.navigation.navigate("RestuarantsByCategory", {
          item: {
            name: `item ${index}`
          }
        })}
      />
    );
  };


  const renderRecentSearchItem = ({ item, index }: { item: any, index: any }) => {
    return (
      <RecentSearchItem
        key={JSON.stringify(item)}
        name={`item ${index}`}

      />
    );
  };

  const filterAction = () => {

  };


  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.header}>
          <HomeHeader
            navigation={props.navigation}
            style={{ width: ScaleWidth(50) }}
            buttonStyle={styles.buttonStyle}
          />
          <SearchInput
            inputStyle={styles.input}
            placeholder={t("search.searchYourFavorites")}
            onChangeText={onChangeTextSearch}
            returnKeyType='done'
            onSubmitEditing={onSubmitEditingSearch}
            editable={true}
          />

        </View>

        <Text style={styles.titles}>{t("search.sortBy")}</Text>
        <FlatList
          data={filterList}
          renderItem={renderRestuarantMenuItem}
          keyExtractor={(item, index) => JSON.stringify(index)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}

        />


        <Text style={styles.titles}>{t("search.filterBy")}</Text>
        <View style={styles.row}>

          {[{}, {}, {}].map((item, index) => {
            return (
              renderRecentSearchItem({ item, index })
            )
          })}
        </View>
        <Text style={styles.titles}>{t("home.categories")}</Text>

        <FlatList
          style={styles.flatList}
          horizontal
          data={[{}, {}, {}, {}, {}]}
          renderItem={renderCategoryItem}
          keyExtractor={(item, index) => JSON.stringify(index)}
          showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}

        />
      </KeyboardAwareScrollView>
      <AppButton
        style={styles.signupButton}
        textStyle={styles.signupText}
        title={t("search.apply")}
        onPress={filterAction}
      />
    </SafeAreaView>
  );
};

export default Filter;
