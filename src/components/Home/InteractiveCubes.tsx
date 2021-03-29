import { BodyProps, Physics, useBox, usePlane } from "@react-three/cannon";
import { useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "react-three-fiber";
import niceColors from "nice-color-palettes";
import { Color } from "three";
import { useHotkeys } from "react-hotkeys-hook";

const InteractiveCubes = () => {
  const Plane = (props: BodyProps) => {
    const [ref] = usePlane(() => ({ mass: 0, ...props }));

    return (
      <mesh ref={ref} receiveShadow>
        <planeBufferGeometry args={[10, 10]} />
        <shadowMaterial color="#171717" opacity={0.5} />
      </mesh>
    );
  };

  const Cubes = () => {
    const [hover, setHover] = useState<number>();
    const [isAuto, setIsAuto] = useState<boolean>(true);
    const [isDropMode, setIsDropMode] = useState<boolean>(true);
    const [ref, api] = useBox(() => ({
      mass: 1,
      args: [0.1, 0.1, 0.1],
      position: [Math.random() + 0.5, Math.random() * 2, Math.random()],
    }));

    const colors = useMemo(() => {
      const array = new Float32Array(200 * 3);
      const color = new Color();
      for (let i = 0; i < 200; i += 1)
        color
          .set(niceColors[4][Math.floor(Math.random() * 5)])
          .convertSRGBToLinear()
          .toArray(array, i * 3);

      return array;
    }, []);

    useFrame(() => {
      if (!isAuto) return;

      api
        .at(Math.floor(Math.random() * 200))
        .position.set(1, Math.random() * 2, 0.5);
    });

    useEffect(() => {
      if (!hover || isAuto) return;

      if (isDropMode) api.at(hover).position.set(1, Math.random() * 2, 0.5);
      else api.at(hover).applyForce([100, 0, 0], [0, 0, 1]);
    }, [hover]);

    useHotkeys("p,r,s", (_, handler) => {
      switch (handler.key) {
        case "p":
          setIsAuto((prev) => !prev);
          break;
        case "r":
          for (let i = 0; i < 200; i += 1) {
            api
              .at(i)
              .position.set(
                Math.random() + 0.5,
                Math.random() * 2,
                Math.random()
              );
          }
          break;
        case "s":
          setIsDropMode((prev) => !prev);
          break;
      }
    });

    return (
      <instancedMesh
        receiveShadow
        castShadow
        ref={ref}
        args={[null, null, 200]}
        onPointerMove={(e) => setHover(e.instanceId)}
      >
        <boxBufferGeometry args={[0.1, 0.1, 0.1]}>
          <instancedBufferAttribute
            attachObject={["attributes", "color"]}
            args={[colors, 3]}
          />
        </boxBufferGeometry>
        <meshLambertMaterial vertexColors />
      </instancedMesh>
    );
  };

  return (
    <Canvas shadowMap colorManagement camera={{ position: [1, 1, 3], fov: 50 }}>
      <color attach="background" args={[0.95, 0.62, 0.02]}></color>
      <hemisphereLight intensity={0.35} />
      <spotLight
        position={[-5, 5, 3]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        castShadow
      />
      <Physics>
        <Plane rotation={[-Math.PI / 2, 0, 0]} />
        <Cubes />
      </Physics>
    </Canvas>
  );
};

export default InteractiveCubes;
