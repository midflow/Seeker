import { StyleSheet, Dimensions } from 'react-native';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  overlay: {
    position: 'absolute',
    padding: 16,
    right: 0,
    left: 0,
    alignItems: 'center',
  },
  topOverlay: {
    top: 0,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  captureButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  typeButton: {
    padding: 5,
  },
  flashButton: {
    padding: 5,
  },
  buttonsSpace: {
    width: 10,
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  cancel: {
    position: 'absolute',
    left: 50,
    bottom: 50,
    backgroundColor: 'transparent',

  },
  accept: {
    position: 'absolute',
    right: 50,
    bottom: 50,
    backgroundColor: 'transparent',

  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  text: {
    marginLeft: 12,
    fontSize: 30,
    color: '#fff',
    textAlignVertical: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  textTitle: {
    marginLeft: 12,
    fontSize: 30,
    textAlignVertical: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  list: {
    flex: 1,
    flexDirection: 'column',
    flexWrap: 'wrap',
    backgroundColor: '#fff',
    padding: 20,
  },
  imageViewContainer: {
    width: '30%',
    height: 70,
    width: 70,
    borderRadius: 35
  },
  textViewContainer: {
    flex: 1,
    height: 70,
    paddingLeft: 10,
  },
  textViewBox: {
    flex: 1,
    borderRadius: 10,
    backgroundColor: '#47525e'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  imageView: {
    height: 80,
    width: 80
  },
  imageViewTitle: {
    height: 100,
    width: 100,
    borderRadius: 50,
    resizeMode: 'cover'
  },
});

export default styles