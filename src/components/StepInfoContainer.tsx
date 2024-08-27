import {Text, View} from 'react-native';
import React from 'react';

type ValueProps = {
  label: string;
  value: string;
  styleLabel?: any;
  styleValue?: any;
};

const StepInfoContainer = ({
  label,
  value,
  styleLabel,
  styleValue,
}: ValueProps) => {
  return (
    <View>
      <Text style={styleLabel}>{label}</Text>
      <Text style={styleValue}>{value}</Text>
    </View>
  );
};

export default StepInfoContainer;
