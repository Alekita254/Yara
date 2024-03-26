"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.AuthError = void 0;
class AuthError extends Error {
  constructor(message) {
    super(message);
  }
}
exports.AuthError = AuthError;