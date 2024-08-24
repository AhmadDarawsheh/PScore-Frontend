import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import colors from "../assets/colors/colors";
import { MagnifyingGlassIcon, XMarkIcon } from "react-native-heroicons/outline";
import DetailsTable from "../components/DetailsTable";
import axios from "axios";
import debounce from "lodash/debounce";
import { useAuth } from "../contexts/AuthContext";
import Player from "../components/Player";
const SearchTeam = ({ onPress }) => {
  const { token, teamData } = useAuth();
  const [search, setSearch] = useState("");
  const [teams, setTeams] = useState(null);
  const searchInputRef = useRef(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Initial loading state
  const [results, setResults] = useState([]);
  useEffect(() => {
    const getTeams = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://pscore-backend.vercel.app/team/dropdownteams`,
          {
            headers: {
              authorization: `Ahmad__${token}`,
            },
          }
        );
        console.log(response.data);
        setResults(response?.data?.teams);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    getTeams();
  }, []);

  const fetchSearch = async (name) => {
    try {
      setLoading(true);
      const response = await axios.get(
        `https://pscore-backend.vercel.app/team/searchteams?teamName=${name}`,
        {
          headers: {
            authorization: `Ahmad__${token}`,
          },
        }
      );
      console.log(response.data);
      setResults(response?.data?.team);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const debouncedFetchData = useCallback(
    debounce((query) => fetchSearch(query), 600),
    []
  );
  const handleSearch = (value) => {
    setSearch(value);
    if (value.length > 2) {
      debouncedFetchData(value);
    } else {
      setResults([]);
    }
  };
  const clearSearch = () => {
    setSearch("");
    setResults([]);
  };

  return (
    <ScrollView>
      <View className="bg-slate-300 rounded-lg mx-4 py-3 mt-5 flex-row items-center justify-between">
        <View className="mx-1">
          <MagnifyingGlassIcon size={30} color={"black"} />
        </View>

        <TextInput
          className="flex-1 px-3"
          value={search}
          onChangeText={handleSearch}
          placeholder="search for teams..."
        ></TextInput>
        {search && (
          <Pressable
            onPress={clearSearch}
            className="mx-1 rounded-md"
            style={{ backgroundColor: colors.myWhite }}
          >
            <XMarkIcon size={30} color={"black"} />
          </Pressable>
        )}
      </View>

      <View className="mt-4 flex">
        <DetailsTable header={"Teams"}>
          {results &&
            results.map(
              (item, index) =>
                item.name !== teamData.team.name && (
                  <Team item={item} key={index} onPress={onPress} />
                )
            )}
        </DetailsTable>
        {loading && <ActivityIndicator color={colors.mainColor} />}
      </View>
    </ScrollView>
  );
};
const Team = ({ item, onPress }) => {
  const handlePress = () => {
    onPress(item._id, item.name, item.image);
  };

  return (
    <TouchableOpacity onPress={handlePress} className="flex-row mt-2">
      <Image
        className="rounded-full"
        style={{ width: 50, height: 50, resizeMode: "center" }}
        source={{ uri: item.image }}
      />
      <View>
        <Text>{item.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
export default SearchTeam;
