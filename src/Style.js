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
      right: 20,
      top: 20,
      backgroundColor: 'transparent',
      color: '#FFF',
      fontWeight: '600',
      fontSize: 17,
    }
  });

  export default styles