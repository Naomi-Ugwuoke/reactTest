// const EmotionController = () => {
//     const emotionRef = useRef();
  
//     // useDrag hook to handle dragging
//     const bind = useDrag(
//       ({ offset: [x, y] }) => {
//         // Update the position of the emotion model based on drag offset
//         emotionRef.current.position.x = x;
//         emotionRef.current.position.y = y;
//       },
//       { pointerEvents: true }
//     );
  
//     return (
//       <>
//         {/* Use Canvas from react-three/fiber */}
//         <Canvas>
//           {/* Lights, Camera, Controls */}
//           <ambientLight intensity={0.5} />
//           <pointLight position={[10, 10, 10]} />
//           <OrbitControls />
          
//           {/* Your Emotion model */}
//           <Emotion ref={emotionRef} {...bind()} />
//         </Canvas>
//       </>
//     );
// };

// export default EmotionController;