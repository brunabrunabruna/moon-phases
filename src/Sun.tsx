const Sun = () => {
  return (
    <>
      <mesh position={[-14, 0, 0]}>
        <sphereGeometry args={[5]} />
        <meshBasicMaterial color={"yellow"} />
      </mesh>
    </>
  );
};

export default Sun;
