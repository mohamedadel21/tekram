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
import RestuarantItem from "../../../components/RestuarantItem";
import EvilIcons from "react-native-vector-icons/EvilIcons";
import SearchInput from "../../../components/SearchInput";
import RecentSearchItem from "../../../components/RecentSearchItem";
import styles from "./styles";
import { Colors, ScaleWidth } from "../../../common/foundation";

const SearchScreen = (props: any) => {
  const { t } = useTranslation();
  const [searchQuery, setSearchQuery] = useState("")
  const timeout = useRef(null);

  const onChangeTextSearch = (value: any) => {
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      setSearchQuery(value)
    }, 1000);
  }
  const onSubmitEditingSearch = () => {

  }
  const renderCategoryItem = ({ item, index }) => {
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


  const renderRecentSearchItem = ({ item, index }) => {
    return (
      <RecentSearchItem
        name={`item ${index}`}

      />
    );
  };


  const renderRestuarantItem = ({ item, index }) => {
    return (
      <RestuarantItem
        imageUrl={
          "https://d3jmn01ri1fzgl.cloudfront.net/photoadking/webp_thumbnail/5fe3257ad6874_json_image_1608721786.webp"
        }
        name={`item ${index}`}
        categories={"Burgers, Fast Food"}
        rating={3.5}
        ratingCount={24}
        isDiscount={true}
        discount={"30%"}
        onPress={() => props.navigation.navigate("RestaurantMenu")}

      />
    );
  };
  return (
    <SafeAreaView style={styles.container}>

      <KeyboardAwareScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
      >

        <SearchInput
          mainStyle={styles.input}
          placeholder={t("search.searchYourFavorites")}
          onChangeText={onChangeTextSearch}
          returnKeyType='done'
          onSubmitEditing={onSubmitEditingSearch}
          editable={false}
          onPress={() => props.navigation.navigate("SearchFilter")}
        />

        <Text style={styles.categories}>{t("home.categories")}</Text>

        <FlatList
          style={styles.flatList}
          horizontal
          data={[{}, {}, {}, {}, {}]}
          renderItem={renderCategoryItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />
        <Text style={styles.categories}>{t("search.recentSearches")}</Text>
        <View style={styles.row}>

          {[{}, {}, {}, {}, {}].map((item, index) => {
            return (
              renderRecentSearchItem({ item, index })
            )
          })}
        </View>

        <Text style={styles.categories}>{t("search.featured")}</Text>

        <FlatList
          style={styles.flatList}
          horizontal
          data={[{}, {}, {}, {}, {}]}
          renderItem={renderRestuarantItem}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
        />

      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default SearchScreen;
