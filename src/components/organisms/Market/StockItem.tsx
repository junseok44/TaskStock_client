import styled, { useTheme } from "styled-components/native";
import { ContentItemBoxContainer } from "../../atoms/ContentItemBox";
import useResponsiveFontSize from "../../../utils/useResponsiveFontSize";
import { spacing } from "../../../constants/spacing";
import { Pressable, View } from "react-native";
import FlexBox from "../../atoms/FlexBox";
import Text from "../../atoms/Text";
import { TextWithIcon } from "../../molecules/TextWithIcon";
import Icons from "../../atoms/Icons";
import Margin from "../../atoms/Margin";

const StockItemBox = styled(ContentItemBoxContainer)`
  width: ${useResponsiveFontSize(150)}px;
  height: ${useResponsiveFontSize(170)}px;
`;

const StockItemSecondBox = styled(ContentItemBoxContainer)`
  border-radius: ${spacing.padding + spacing.small}px;
  background-color: ${({ theme }) => theme.box};
  padding: ${spacing.padding + spacing.small * 1.5}px ${spacing.offset}px;
`;

export const StockItem = ({
  id,
  name,
  percent,
  price,
  onPress,
}: {
  id: number;
  name: string;
  percent: number;
  price: number;
  onPress: () => void;
}) => {
  const theme = useTheme();
  const percentFormat = percent.toFixed(2);

  return (
    <Pressable onPress={onPress}>
      <StockItemBox>
        <FlexBox
          direction="column"
          justifyContent="space-between"
          styles={{
            flex: 1,
          }}
        >
          <Text size="md" weight="bold" color={theme.textDim}>
            {name.length > 15 ? name.slice(0, 15) + "..." : name}
          </Text>
          <Margin margin={30}></Margin>
          <View>
            <TextWithIcon text={percentFormat + "%"}>
              {percent > 0 ? (
                <Icons
                  type="AntDesign"
                  name="caretup"
                  size={14}
                  color={theme.palette.red}
                ></Icons>
              ) : (
                <Icons
                  type="AntDesign"
                  name="caretdown"
                  size={14}
                  color={theme.palette.blue}
                ></Icons>
              )}
            </TextWithIcon>
            <Text size="xl" weight="bold">
              {price.toLocaleString()}
            </Text>
          </View>
        </FlexBox>
      </StockItemBox>
    </Pressable>
  );
};

export const StockItemSecond = ({
  index,
  id,
  name,
  percent,
  onPress,
}: {
  index: number;
  id: number;
  name: string;
  percent: number;
  onPress: () => void;
}) => {
  const theme = useTheme();

  const percentFormat = percent.toFixed(2);

  return (
    <Pressable onPress={onPress}>
      <StockItemSecondBox>
        <FlexBox gap={spacing.offset}>
          <Text size="md" weight="bold">
            {index}
          </Text>
          <View style={{ flex: 1 }}>
            <Text size="md">
              {name.length > 15 ? name.slice(0, 15) + "..." : name}
            </Text>
          </View>
          <TextWithIcon text={percentFormat + "%"}>
            {percent > 0 ? (
              <Icons
                type="AntDesign"
                name="caretup"
                size={14}
                color={theme.palette.red}
              />
            ) : (
              <Icons
                type="AntDesign"
                name="caretdown"
                size={14}
                color={theme.palette.blue}
              />
            )}
          </TextWithIcon>
        </FlexBox>
      </StockItemSecondBox>
    </Pressable>
  );
};

export const StockItemForWishList = ({
  left,
  name,
  likes,
  isLiked,
  onPress,
}: {
  left: number | string;
  name: string;
  likes: number;
  isLiked: boolean;
  onPress: () => void;
}) => {
  return (
    <StockItemSecondBox>
      <FlexBox gap={spacing.offset}>
        <Text size="md" weight="bold">
          {left}
        </Text>
        <View style={{ flex: 1 }}>
          <Text size="md">
            {name.length > 15 ? name.slice(0, 15) + "..." : name}
          </Text>
        </View>
        <TextWithIcon text={likes + ""}>
          <>
            {isLiked ? (
              <Icons
                onPress={onPress}
                type="AntDesign"
                name="heart"
                size={18}
                color={"red"}
              />
            ) : (
              <Icons
                onPress={onPress}
                type="AntDesign"
                name="hearto"
                size={18}
                color={"red"}
              />
            )}
            <Margin
              direction="horizontal"
              margin={spacing.small * 0.5}
            ></Margin>
          </>
        </TextWithIcon>
      </FlexBox>
    </StockItemSecondBox>
  );
};