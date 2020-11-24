import React, { useState, useEffect } from 'react';
import { Image, Text, View, TouchableOpacity, Modal } from 'react-native';
import * as MediaLibrary from 'expo-media-library'; //Salvar fotos na galeria
import * as Permissions from 'expo-permissions'; //Permissão para usar a galeria
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState(null); //guarda a escolha sobre a permissão
  const [cameraRef, setCameraRef] = useState(null);
  const [capturedPhoto, setCapturedPhoto] = useState(null); //guarda o uri da imagem
  const [bas64, setBas64] = useState(null); //guarda a base 64 imagem
  const [type, setType] = useState(Camera.Constants.Type.back); //camera da frente ou traseira
  const [open, setOpen] = useState(false); //Controla a abertura do modal que mostra a foto
  useEffect(() => {
    //--------Permissão para usar a camera
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted'); //alterando para true caso a ermissão seja granted
    })();
    //-------Permissão para salvar a foto
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status === 'granted');
    })();
  }, []);

  //--------Metodo executado ao tirar a foto
  async function takePicture() {
    console.log('1');

    if (cameraRef) {
      const opcoes = {
        quality: 0.05,
        base64: true,
      };

      let photo = await cameraRef.takePictureAsync(opcoes);
      console.log('data', photo);
      console.log('Tamanho do Base64: ', photo.base64.length);
      setCapturedPhoto(photo.uri);
      setBas64(photo.base64);
      setOpen(true); //Para abrir o modal que mostrara a foto
    }
  }
  //--------Metodo utilizado para salvar a foto
  async function savePicture() {
    const asset = await MediaLibrary.createAssetAsync(capturedPhoto)
      .then(() => {
        alert('salvo com sucesso');
      })
      .catch((error) => console.log('err', error));
  }
  //-------Metodo utilizado para fazer upload da imagem
  async function sendPicture() {
    const req = {
      imagebytes: bas64,
    }
    alert('Enviado com sucesso');
  }

  if (hasPermission === null) {
    //Caso não hajam informações sobre permissões
    return <View />;
  }
  if (hasPermission === false) {
    //Caso haja informação mas a permissão tenha sido negada
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      <Camera
        style={{ flex: 1 }}
        type={type}
        ref={(ref) => {
          setCameraRef(ref);
        }}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            justifyContent: 'flex-end',
          }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
            {/*Botão de trocar a camera*/}
            <TouchableOpacity
              style={{ margin: 20 }}
              onPress={() => {
                setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                );
              }}>
              <Ionicons name="ios-reverse-camera" size={60} color="white" />
            </TouchableOpacity>
            {/*Botão de tirar a foto*/}
            <TouchableOpacity
              style={{ margin: 20 }}
              onPress={async () => takePicture()}>
              <Ionicons name="ios-camera" size={60} color="white" />
            </TouchableOpacity>
          </View>
          {capturedPhoto && ( //Modal que mostra a imagem na tela
            <Modal animationType="slide" transparent={false} visible={open}>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: 'black',
                }}>
                <Image
                  style={{
                    width: '100%',
                    height: 500,
                    borderRadius: 10,
                    margin: 15,
                  }}
                  source={{ uri: capturedPhoto }}
                />
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <TouchableOpacity
                    style={{ margin: 20 }}
                    onPress={() => setOpen(false)}>
                    <Ionicons name="md-close" size={60} color="white" />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ margin: 20 }}
                    onPress={async () => savePicture()}>
                    <Ionicons
                      name="md-arrow-round-down"
                      size={60}
                      color="white"
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{ margin: 20 }}
                    onPress={async () => sendPicture()}>
                    <Ionicons name="ios-send" size={60} color="white" />
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>
          )}
        </View>
      </Camera>
    </View>
  );
}
