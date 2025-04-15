import { useGLTF, useAnimations } from '@react-three/drei';
import { useEffect, useRef } from 'react';

export default function Basket(props) {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/basket2.glb');
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    
    if (actions) {
      Object.values(actions).forEach((action) => {
        action.timeScale = 0.7;
        action.reset().play();
      });
    }
  }, [actions]);

  return <primitive ref={group} object={scene} {...props} />;
}
