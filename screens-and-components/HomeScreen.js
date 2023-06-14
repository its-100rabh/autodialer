import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, KeyboardAvoidingView, ScrollView } from 'react-native';

const App = () => {
    const [isPaused, setIsPaused] = useState(false);
    const [jsonData, setJsonData] = useState('');
    const [callGap, setCallGap] = useState('');
    const [currentNumber, setCurrentNumber] = useState('');
    const [currentPriority, setCurrentPriority] = useState('');

    const handlePauseAutoDialer = () => {
        setIsPaused(false);
        setCurrentNumber('Auto Dialer: Paused');
        setCurrentPriority('');
    };

    const handleStopAutoDialer = () => {
        setCurrentNumber('');
        setCurrentPriority('');
    };


    const handleStartAutoDialer = () => {
        if (!jsonData) {
            // Handle the case when jsonData is empty
            console.log('Please enter JSON data');
            return;
        }

        if (!callGap) {
            // Handle the case when callGap is empty
            console.log('Please enter the call gap');
            return;
        }

        const parsedJsonData = JSON.parse(jsonData);
        console.log('Parsed JSON data:', parsedJsonData);
        console.log('Call Gap:', callGap);

        let currentNumberIndex = 0;

        const dialNextNumber = () => {
            if (currentNumberIndex >= parsedJsonData.length) {
                // All numbers dialed, exit the auto-dialer
                // Perform any necessary cleanup or finalization here
                return;
            }

            const { Number, Priority, status } = parsedJsonData[currentNumberIndex];

            if (status === 'skip') {
                // Skip this number and move to the next one
                currentNumberIndex++;
                dialNextNumber();
                return;
            }

            setCurrentNumber(Number);
            setCurrentPriority(Priority);

            // Simulate dialing the number
            console.log(`Dialing ${Number}`);

            setTimeout(() => {
                // Disconnect call and wait for the call gap duration
                console.log(`Call disconnected for ${Number}`);

                // Check if there are more numbers to dial
                currentNumberIndex++;
                dialNextNumber();
            }, callGap * 1000);
        };

        if (!isPaused) {
            dialNextNumber();
        }

        dialNextNumber(); // Start dialing the numbers
    };


    return (
        <KeyboardAvoidingView style={styles.container} behavior="height" keyboardVerticalOffset={2}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <View style={styles.row}>
                    <Text style={styles.label}>Call Gap (seconds):</Text>
                    <TextInput
                        style={styles.textGapInput}
                        placeholder="type here.."
                        value={callGap}
                        onChangeText={setCallGap}
                        keyboardType="numeric"
                    />
                </View>
                <View>
                    <Text style={styles.label}>Insert JSON phone data:</Text>
                    <TextInput
                        style={styles.textInput}
                        placeholder="type here..."
                        value={jsonData}
                        onChangeText={setJsonData}
                        multiline
                    />
                </View>
                <View style={styles.buttonContainer}>
                    <View style={[styles.button, { height: 50, width: 200 }]}>
                        <Button title="Start Auto-dialer" onPress={handleStartAutoDialer} color="blue" />
                    </View>
                    <View style={[styles.button, { height: 50, width: 200 }]}>
                        <Button title="Pause Auto-dialer" onPress={handlePauseAutoDialer} color="#fabd14" />
                    </View>
                    <View style={[styles.button, { height: 50, width: 200 }]}>
                        <Button title="Stop Auto-dialer" onPress={handleStopAutoDialer} color="#f74b2d" />
                    </View>
                </View>
                <View style={styles.currentStatusContainer}>
                    <Text style={styles.label}>Current Status:</Text>
                    <Text style={styles.currentStatusText}>Current Number: {currentNumber}</Text>
                    <Text style={styles.currentStatusText}>Priority: {currentPriority}</Text>

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        marginTop: 60,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    label: {
        marginRight: 10,
        fontWeight: 'bold',
        fontSize: 20,
    },
    textInput: {
        flex: 1,
        borderWidth: 2.5,
        borderColor: 'black',
        height: 150,
        textAlignVertical: 'top',
        marginTop: 10,
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    buttonContainer: {
        marginTop: 20,
        marginBottom: 20,
        width: 200,
        alignItems: 'center',
    },
    currentStatusContainer: {
        marginTop: 20,
        marginLeft: 70,
    },
    currentStatusText: {
        marginBottom: 10,
        fontSize: 18,


    },
    scrollViewContent: {
        flexGrow: 1,
    },
    textGapInput: {
        height: 40,
        borderColor: 'black',
        borderWidth: 2.5,
        flex: 1,
        alignItems: 'flex-start',
        paddingHorizontal: 10,
    },
    button: {
        marginLeft: 150,
    }
});

export default App;
