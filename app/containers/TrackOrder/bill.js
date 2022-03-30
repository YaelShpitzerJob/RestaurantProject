import React from 'react';
import { Page, Text, View, Document, StyleSheet,PDFViewer } from '@react-pdf/renderer';
import { messages } from './messages';
const styles = StyleSheet.create({
    page: {
      flexDirection: 'row',
      backgroundColor: '#E4E4E4'
    },
    section: {
      margin: 10,
      padding: 10,
    //   flexGrow: 2
    }
  });
const Bill = ({currentOrder, getDishOfMenu}) => (
    <PDFViewer>
        <Document>
            <Page size="A5" style={styles.page}>
                <View style={styles.section}>
                    <Text>{messages.dishName}</Text>
                    {currentOrder.menu.map((item,index) => {
                        const name = getDishOfMenu(item.dishId)
                        return (
                        <View key={index} style={styles.section}>
                            <Text>{name.nameOfDish}</Text>
                        </View>)
                    })}
                </View>
                <View style={styles.section}>
                    <Text>{messages.amount}</Text>
                    {currentOrder.menu.map((item,index) => {
                        return (
                            <View key={index} style={styles.section}>
                                <Text>{item.amount}</Text>
                            </View>
                        )
                    })}
                </View>
                <View style={styles.section}>
                    <Text>{messages.price}</Text>
                    {currentOrder.menu.map((item,index) => {
                        const price = getDishOfMenu(item.dishId);
                        return (
                            <View key={index} style={styles.section}>
                                <Text>{price.price}</Text>
                            </View>
                        )
                    })}
                </View>
            </Page>
        </Document>
    </PDFViewer>
)
export default  Bill;