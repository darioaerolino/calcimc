import { View, Text, TextInput , Vibration, TouchableOpacity, Pressable , Keyboard } from "react-native"
import ResultImc from "./ResultImc";
import { useState } from "react"
import styles from "./style";


export default function Form(){


const [height, setHeight] = useState(null)
const [weight, setWeight] = useState(null)
const [messageImc, setMessageImc] = useState(null)
const [imc, setImc ] = useState(null)
const [textButton, setTextButton] = useState("Calcular")
const [erroMessage, setErroMessage] = useState(null)

function imcCalculator(){
    let heightFormat = height.replace(",",".")
    return setImc((weight / (heightFormat * heightFormat)).toFixed(2));
}

function verification() {
    if(imc == null){
        setErroMessage("campo obrigatório*")
        setMessageImc("preencha o peso e a altura")
        Vibration.vibrate()
    }

}

function validationImc(){
    
    if(weight != null && height != null){
        imcCalculator()
        setHeight(null)
        setWeight(null)
        setMessageImc("Seu imc é igual: ")
        setTextButton("Calcular Novamente")
        setErroMessage(null)
        return 
    }
    else{
        setImc(null)
        setMessageImc(null)
        verification()
        setTextButton("Calcular")
    }
}
    return (
        <Pressable onPress={Keyboard.dismiss}  style={styles.formContext}>
            
            <View style={styles.form}>
                
                <Text style={styles.formLabel}>Altura</Text>
                <TextInput style={styles.input}
                onChangeText={setHeight}
                value={height}
                placeholder="EX. 1.75"
                keyboardType="numeric"
                />
                <Text style={styles.errorMessage}>{erroMessage}</Text>

                <Text style={styles.formLabel}>Peso</Text>
                <TextInput style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="EX. 75.564"
                keyboardType="numeric"
                />
                <Text style={styles.errorMessage}>{erroMessage}</Text>

                <TouchableOpacity style={styles.buttonCalculator}
                onPress={() => validationImc()}>
                <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
                    
            </View>

            <ResultImc messageResultImc={messageImc} resultImc={imc} />
        
        </Pressable>
    );
}