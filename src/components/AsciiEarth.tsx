'use client';

import { GLOBE_TEXTURE_URL } from '@/lib/constants';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const WIDTH = 48;
const HEIGHT = 48;
const ASCII = '   ·—+=##';

const AsciiEarth: React.FC = () => {
  const outputRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let globe: THREE.Mesh;
    let gl: WebGLRenderingContext;
    let pixels: Uint8Array;

    const init = () => {
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(1, WIDTH / HEIGHT, 0.1, 1000);
      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        alpha: true,
        antialias: true,
      });
      renderer.setSize(WIDTH, HEIGHT);

      const texture = new THREE.TextureLoader().load(GLOBE_TEXTURE_URL); // Add your texture URL here
      const geometry = new THREE.SphereGeometry(3, 64, 48);
      const material = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0x000000,
        roughness: 1,
        metalness: 1,
        map: texture,
      });
      globe = new THREE.Mesh(geometry, material);
      globe.rotation.z = Math.PI;
      globe.rotation.y = 1.5;
      scene.add(globe);

      const light = new THREE.PointLight(0xffffff, 3.33, 0);
      light.position.set(150, -150, 1500);
      scene.add(light);

      const light2 = new THREE.PointLight(0xffffff, 2, 0);
      light2.position.set(-125, 100, -500);
      scene.add(light2);

      camera.position.z = 345;
      gl = renderer.getContext();
      pixels = new Uint8Array(
        gl.drawingBufferWidth * gl.drawingBufferHeight * 4
      );

      render();
    };

    const render = () => {
      requestAnimationFrame(render);
      globe.rotation.y -= 0.01;
      renderer.render(scene, camera);
      gl.readPixels(0, 0, WIDTH, HEIGHT, gl.RGBA, gl.UNSIGNED_BYTE, pixels);
      const text = grayscale10(pixels).map(asciify).join('');
      const reversedText = text.split('\n').map(reverseString).join('\n');
      if (outputRef.current) {
        outputRef.current.innerHTML = reversedText;
      }
    };

    const reverseString = (str: string) => {
      return str.split('').reverse().join('');
    };

    const grayscale10 = (pixels: Uint8Array) => {
      const length = pixels.length;
      const gsPixels = [];
      for (let i = 0; i < length; i += 4) {
        gsPixels.push(
          Math.floor(
            ((pixels[i] + pixels[i + 1] + pixels[i + 2]) / 768) * ASCII.length
          )
        );
      }
      return gsPixels;
    };

    const asciify = (val: number, index: number) => {
      let br = '';
      if (
        index !== 0 && // exclude first row
        index % WIDTH === 0
      ) {
        br = '\n';
      }
      return br + ASCII[val];
    };

    init();

    return () => {
      // Clean up
      if (renderer) {
        renderer.dispose();
      }
      if (scene) {
        scene.clear();
      }
    };
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div
        ref={outputRef}
        style={{
          backgroundImage:
            'radial-gradient(circle farthest-corner at 75% 75%, rgba(0,0,16,1) 0%,rgba(0,16,32,1) 50%,rgba(0,64,48,1) 100%)',
          borderRadius: '100%',
          color: 'rgb(32, 220, 128)',
          fontSize: '3vmin',
          lineHeight: '.55em',
          textRendering: 'optimizeSpeed',
          willChange: 'contents',
          whiteSpace: 'pre',
        }}
      ></div>
      <canvas
        ref={canvasRef}
        className="hidden"
        width={WIDTH}
        height={HEIGHT}
      ></canvas>
    </div>
  );
};

export default AsciiEarth;
