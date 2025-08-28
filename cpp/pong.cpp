// pong - C++ game logic (WASM-friendly)
// This file contains core logic functions that can be compiled to WebAssembly via Emscripten.
// The JS frontend can call exported functions to update/render based on game state.
//
// Note: these are illustrative and minimal. For full browser integration compile with emscripten
// e.g.: emcc pong.cpp -s WASM=1 -s EXPORTED_FUNCTIONS='["_some_export"]' -o pong.js

#include <vector>
#include <cstdint>
#include <cstdlib>
#include <cstring>
extern "C" {
// Example exported function
int add(int a,int b) {
    return a+b;
}

// You can add more functions here to manage game state.
}
