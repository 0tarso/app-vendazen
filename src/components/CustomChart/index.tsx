import { View, Text } from 'react-native'
import React, { ReactNode } from 'react'
import { COLORS } from '@/src/constants/Colors'
import { BarChart, PieChart } from 'react-native-gifted-charts'
import { Ionicons } from '@expo/vector-icons'
import { transformPaymentMethodName } from '@/src/utils/transform-payment-method'


interface CustomChartProps {
  data: [{ value: number, label: string, topLabelComponent: () => ReactNode }]
  maxValue: number | 0,
  type?: 'bar' | 'pie'
}


export default function CustomChart(props: CustomChartProps) {

  return (

    <>
      {props.type === 'bar' && (

        <BarChart
          data={props.data}
          // horizontal
          // width={300}
          height={300}
          maxValue={1.2 * props.maxValue}
          // height={00}
          barWidth={45}
          barBorderRadius={5}
          barBorderTopLeftRadius={10}
          barBorderTopRightRadius={10}
          frontColor={COLORS.GreenPrimary}
          yAxisThickness={0}
          xAxisThickness={0}
          noOfSections={3}
          barBorderWidth={1}
          barBorderColor={COLORS.GreenSecondary}
          // initialSpacing={5}
          yAxisLabelPrefix='R$'
          // labelsDistanceFromXaxis={10}
          hideYAxisText
          // adjustToWidth
          // yAxisExtraHeight={10}
          // yAxisLabelWidth={50}
          // topLabelContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}
          xAxisLabelTextStyle={{ fontFamily: "MontserratSemiBold", color: COLORS.GrayFont, fontSize: 12 }}

        />
      )}

      {props.type === 'pie' && (
        <>

          <PieChart
            data={props.data}
            showText
            textColor="#fff"
            radius={120}
            textSize={16}
            // showTextBackground
            textBackgroundRadius={25}
            donut
            strokeWidth={3}
            strokeColor={"#ffff"}
            font='MontserratBold'
          />

          <View style={{ flex: 1, flexDirection: 'row', columnGap: 20, rowGap: 10, flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 20, paddingHorizontal: 20 }}>
            {props.data.map((item) => (
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }} key={item.method}>
                <View style={{ width: 20, height: 20, backgroundColor: item.color, borderRadius: 100 }}></View>
                <Text style={{ fontFamily: "MontserratSemiBold", color: COLORS.GrayFont, fontSize: 12 }}>{transformPaymentMethodName(item.method, 'display')} - {item.text}</Text>
              </View>
            ))}
          </View>
        </>
      )}

    </>
  )
}