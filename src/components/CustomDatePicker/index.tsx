import React, { useState, useRef, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import { styles } from "./styles";

const ITEM_HEIGHT = 40; // altura de cada número no scroll
const SCREEN_HEIGHT = Dimensions.get("window").height;

interface CustomDatePickerProps {
  onChangeDate: (dateString: string) => void
}

export default function CustomDatePicker(props: CustomDatePickerProps) {

  const [visible, setVisible] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const [day, setDay] = useState(selectedDate.getDate());
  const [month, setMonth] = useState(selectedDate.getMonth() + 1);
  const [year, setYear] = useState(selectedDate.getFullYear());

  const years = Array.from({ length: 100 }, (_, i) => 1980 + i);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const days = Array.from({ length: 31 }, (_, i) => i + 1);

  const scrollDayRef = useRef<ScrollView>(null);
  const scrollMonthRef = useRef<ScrollView>(null);
  const scrollYearRef = useRef<ScrollView>(null);

  function confirmDate() {
    const newDate = new Date(year, month - 1, day);
    setSelectedDate(newDate);
    setVisible(false);
  }

  useEffect(() => {

    selectedDate.setHours(0, 0, 0, 0)
    console.log('Useefect datepicker-> ', selectedDate)

    props.onChangeDate(selectedDate.toISOString())
  }, [selectedDate])

  // função para alinhar o item ao centro
  const handleMomentumScrollEnd = (
    event: { nativeEvent: { contentOffset: { y: number } } },
    list: number[],
    setter: React.Dispatch<React.SetStateAction<number>>
  ) => {
    const y = event.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    const value = list[index];
    setter(value);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setVisible(true)} style={styles.openButton}>
        <Text style={styles.openButtonText}>
          {selectedDate.toLocaleDateString("pt-BR")}
        </Text>
      </TouchableOpacity>

      <Modal visible={visible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Selecione uma data</Text>

            <View style={styles.pickers}>
              <ScrollView
                ref={scrollDayRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) =>
                  handleMomentumScrollEnd(e, days, setDay)
                }
                contentOffset={{ y: (day - 1) * ITEM_HEIGHT, x: 0 }}
                style={[styles.scroll, { height: ITEM_HEIGHT * 3 }]}
                contentContainerStyle={{
                  paddingBottom: ITEM_HEIGHT * 2,
                }}
              >
                {days.map((d) => (
                  <View key={d} style={[styles.scrollItem, { height: ITEM_HEIGHT }]}>
                    <Text
                      style={[
                        styles.scrollText,
                        d === day && styles.selectedText,
                      ]}
                    >
                      {d}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              {/* Meses */}
              <ScrollView
                ref={scrollMonthRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) =>
                  handleMomentumScrollEnd(e, months, setMonth)
                }
                contentOffset={{ y: (month - 1) * ITEM_HEIGHT, x: 0 }}
                style={[styles.scroll, { height: ITEM_HEIGHT * 3 }]}
                contentContainerStyle={{
                  paddingBottom: ITEM_HEIGHT * 2,
                }}
              >
                {months.map((m) => (
                  <View key={m} style={[styles.scrollItem, { height: ITEM_HEIGHT }]}>
                    <Text
                      style={[
                        styles.scrollText,
                        m === month && styles.selectedText,
                      ]}
                    >
                      {m}
                    </Text>
                  </View>
                ))}
              </ScrollView>

              {/* Anos */}
              <ScrollView
                ref={scrollYearRef}
                showsVerticalScrollIndicator={false}
                snapToInterval={ITEM_HEIGHT}
                decelerationRate="fast"
                onMomentumScrollEnd={(e) =>
                  handleMomentumScrollEnd(e, years, setYear)
                }
                contentOffset={{ y: (year - years[0]) * ITEM_HEIGHT, x: 0 }}
                style={[styles.scroll, { height: ITEM_HEIGHT * 3 }]}
                contentContainerStyle={{
                  paddingBottom: ITEM_HEIGHT * 2,
                }}
              >
                {years.map((y) => (
                  <View key={y} style={[styles.scrollItem, { height: ITEM_HEIGHT }]}>
                    <Text
                      style={[
                        styles.scrollText,
                        y === year && styles.selectedText,
                      ]}
                    >
                      {y}
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* Linha indicadora */}
            <View
              style={[
                styles.centerLine,
                { top: ITEM_HEIGHT * 1.5, height: ITEM_HEIGHT },
              ]}
            />

            <View style={styles.buttonRow}>
              <TouchableOpacity
                onPress={() => setVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmDate} style={styles.confirmButton}>
                <Text style={styles.confirmText}>Confirmar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

      </Modal>
    </View>
  );
}
