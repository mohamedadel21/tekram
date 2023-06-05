import React, { useEffect, useState } from "react";
import { Provider } from "react-redux";
import store from "./src/redux/store";
import "./i18n.config";
import RootNavigator from "./src/navigation";
import { StatusBar, Alert } from "react-native";
import { Colors } from "./src/common/foundation";
import NetInfo from '@react-native-community/netinfo';
import { CommonActions } from "@react-navigation/native";
import { navigate } from './src/navigation/RootNavigator';

const App = (props) => {
	const [loading, setLoading] = useState(true);

	
	setTimeout(() => {
		setLoading(false);
	}, 100);

	if (!loading) {
		return (
			<Provider store={store}>
				<StatusBar backgroundColor={Colors.inputBackground} />
				<RootNavigator />
			</Provider>
		);
	}
};

export default App;
