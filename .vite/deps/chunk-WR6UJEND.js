import {
  __commonJS
} from "./chunk-2TUXWMP5.js";

// node_modules/.pnpm/recordrtc@5.6.2/node_modules/recordrtc/RecordRTC.js
var require_RecordRTC = __commonJS({
  "node_modules/.pnpm/recordrtc@5.6.2/node_modules/recordrtc/RecordRTC.js"(exports, module) {
    function RecordRTC(mediaStream, config) {
      if (!mediaStream) {
        throw "First parameter is required.";
      }
      config = config || {
        type: "video"
      };
      config = new RecordRTCConfiguration(mediaStream, config);
      var self = this;
      function startRecording(config2) {
        if (!config.disableLogs) {
          console.log("RecordRTC version: ", self.version);
        }
        if (!!config2) {
          config = new RecordRTCConfiguration(mediaStream, config2);
        }
        if (!config.disableLogs) {
          console.log("started recording " + config.type + " stream.");
        }
        if (mediaRecorder) {
          mediaRecorder.clearRecordedData();
          mediaRecorder.record();
          setState("recording");
          if (self.recordingDuration) {
            handleRecordingDuration();
          }
          return self;
        }
        initRecorder(function() {
          if (self.recordingDuration) {
            handleRecordingDuration();
          }
        });
        return self;
      }
      function initRecorder(initCallback) {
        if (initCallback) {
          config.initCallback = function() {
            initCallback();
            initCallback = config.initCallback = null;
          };
        }
        var Recorder = new GetRecorderType(mediaStream, config);
        mediaRecorder = new Recorder(mediaStream, config);
        mediaRecorder.record();
        setState("recording");
        if (!config.disableLogs) {
          console.log("Initialized recorderType:", mediaRecorder.constructor.name, "for output-type:", config.type);
        }
      }
      function stopRecording(callback) {
        callback = callback || function() {
        };
        if (!mediaRecorder) {
          warningLog();
          return;
        }
        if (self.state === "paused") {
          self.resumeRecording();
          setTimeout(function() {
            stopRecording(callback);
          }, 1);
          return;
        }
        if (self.state !== "recording" && !config.disableLogs) {
          console.warn('Recording state should be: "recording", however current state is: ', self.state);
        }
        if (!config.disableLogs) {
          console.log("Stopped recording " + config.type + " stream.");
        }
        if (config.type !== "gif") {
          mediaRecorder.stop(_callback);
        } else {
          mediaRecorder.stop();
          _callback();
        }
        setState("stopped");
        function _callback(__blob) {
          if (!mediaRecorder) {
            if (typeof callback.call === "function") {
              callback.call(self, "");
            } else {
              callback("");
            }
            return;
          }
          Object.keys(mediaRecorder).forEach(function(key) {
            if (typeof mediaRecorder[key] === "function") {
              return;
            }
            self[key] = mediaRecorder[key];
          });
          var blob = mediaRecorder.blob;
          if (!blob) {
            if (__blob) {
              mediaRecorder.blob = blob = __blob;
            } else {
              throw "Recording failed.";
            }
          }
          if (blob && !config.disableLogs) {
            console.log(blob.type, "->", bytesToSize(blob.size));
          }
          if (callback) {
            var url;
            try {
              url = URL.createObjectURL(blob);
            } catch (e) {
            }
            if (typeof callback.call === "function") {
              callback.call(self, url);
            } else {
              callback(url);
            }
          }
          if (!config.autoWriteToDisk) {
            return;
          }
          getDataURL(function(dataURL) {
            var parameter = {};
            parameter[config.type + "Blob"] = dataURL;
            DiskStorage.Store(parameter);
          });
        }
      }
      function pauseRecording() {
        if (!mediaRecorder) {
          warningLog();
          return;
        }
        if (self.state !== "recording") {
          if (!config.disableLogs) {
            console.warn("Unable to pause the recording. Recording state: ", self.state);
          }
          return;
        }
        setState("paused");
        mediaRecorder.pause();
        if (!config.disableLogs) {
          console.log("Paused recording.");
        }
      }
      function resumeRecording() {
        if (!mediaRecorder) {
          warningLog();
          return;
        }
        if (self.state !== "paused") {
          if (!config.disableLogs) {
            console.warn("Unable to resume the recording. Recording state: ", self.state);
          }
          return;
        }
        setState("recording");
        mediaRecorder.resume();
        if (!config.disableLogs) {
          console.log("Resumed recording.");
        }
      }
      function readFile(_blob) {
        postMessage(new FileReaderSync().readAsDataURL(_blob));
      }
      function getDataURL(callback, _mediaRecorder) {
        if (!callback) {
          throw "Pass a callback function over getDataURL.";
        }
        var blob = _mediaRecorder ? _mediaRecorder.blob : (mediaRecorder || {}).blob;
        if (!blob) {
          if (!config.disableLogs) {
            console.warn("Blob encoder did not finish its job yet.");
          }
          setTimeout(function() {
            getDataURL(callback, _mediaRecorder);
          }, 1e3);
          return;
        }
        if (typeof Worker !== "undefined" && !navigator.mozGetUserMedia) {
          var webWorker = processInWebWorker(readFile);
          webWorker.onmessage = function(event) {
            callback(event.data);
          };
          webWorker.postMessage(blob);
        } else {
          var reader = new FileReader();
          reader.readAsDataURL(blob);
          reader.onload = function(event) {
            callback(event.target.result);
          };
        }
        function processInWebWorker(_function) {
          try {
            var blob2 = URL.createObjectURL(new Blob([
              _function.toString(),
              "this.onmessage =  function (eee) {" + _function.name + "(eee.data);}"
            ], {
              type: "application/javascript"
            }));
            var worker = new Worker(blob2);
            URL.revokeObjectURL(blob2);
            return worker;
          } catch (e) {
          }
        }
      }
      function handleRecordingDuration(counter) {
        counter = counter || 0;
        if (self.state === "paused") {
          setTimeout(function() {
            handleRecordingDuration(counter);
          }, 1e3);
          return;
        }
        if (self.state === "stopped") {
          return;
        }
        if (counter >= self.recordingDuration) {
          stopRecording(self.onRecordingStopped);
          return;
        }
        counter += 1e3;
        setTimeout(function() {
          handleRecordingDuration(counter);
        }, 1e3);
      }
      function setState(state) {
        if (!self) {
          return;
        }
        self.state = state;
        if (typeof self.onStateChanged.call === "function") {
          self.onStateChanged.call(self, state);
        } else {
          self.onStateChanged(state);
        }
      }
      var WARNING = 'It seems that recorder is destroyed or "startRecording" is not invoked for ' + config.type + " recorder.";
      function warningLog() {
        if (config.disableLogs === true) {
          return;
        }
        console.warn(WARNING);
      }
      var mediaRecorder;
      var returnObject = {
        /**
         * This method starts the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var recorder = RecordRTC(mediaStream, {
         *     type: 'video'
         * });
         * recorder.startRecording();
         */
        startRecording,
        /**
         * This method stops the recording. It is strongly recommended to get "blob" or "URI" inside the callback to make sure all recorders finished their job.
         * @param {function} callback - Callback to get the recorded blob.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     // use either "this" or "recorder" object; both are identical
         *     video.src = this.toURL();
         *     var blob = this.getBlob();
         * });
         */
        stopRecording,
        /**
         * This method pauses the recording. You can resume recording using "resumeRecording" method.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo Firefox is unable to pause the recording. Fix it.
         * @example
         * recorder.pauseRecording();  // pause the recording
         * recorder.resumeRecording(); // resume again
         */
        pauseRecording,
        /**
         * This method resumes the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.pauseRecording();  // first of all, pause the recording
         * recorder.resumeRecording(); // now resume it
         */
        resumeRecording,
        /**
         * This method initializes the recording.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo This method should be deprecated.
         * @example
         * recorder.initRecorder();
         */
        initRecorder,
        /**
         * Ask RecordRTC to auto-stop the recording after 5 minutes.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var fiveMinutes = 5 * 1000 * 60;
         * recorder.setRecordingDuration(fiveMinutes, function() {
         *    var blob = this.getBlob();
         *    video.src = this.toURL();
         * });
         * 
         * // or otherwise
         * recorder.setRecordingDuration(fiveMinutes).onRecordingStopped(function() {
         *    var blob = this.getBlob();
         *    video.src = this.toURL();
         * });
         */
        setRecordingDuration: function(recordingDuration, callback) {
          if (typeof recordingDuration === "undefined") {
            throw "recordingDuration is required.";
          }
          if (typeof recordingDuration !== "number") {
            throw "recordingDuration must be a number.";
          }
          self.recordingDuration = recordingDuration;
          self.onRecordingStopped = callback || function() {
          };
          return {
            onRecordingStopped: function(callback2) {
              self.onRecordingStopped = callback2;
            }
          };
        },
        /**
         * This method can be used to clear/reset all the recorded data.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo Figure out the difference between "reset" and "clearRecordedData" methods.
         * @example
         * recorder.clearRecordedData();
         */
        clearRecordedData: function() {
          if (!mediaRecorder) {
            warningLog();
            return;
          }
          mediaRecorder.clearRecordedData();
          if (!config.disableLogs) {
            console.log("Cleared old recorded data.");
          }
        },
        /**
         * Get the recorded blob. Use this method inside the "stopRecording" callback.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     var blob = this.getBlob();
         *
         *     var file = new File([blob], 'filename.webm', {
         *         type: 'video/webm'
         *     });
         *
         *     var formData = new FormData();
         *     formData.append('file', file); // upload "File" object rather than a "Blob"
         *     uploadToServer(formData);
         * });
         * @returns {Blob} Returns recorded data as "Blob" object.
         */
        getBlob: function() {
          if (!mediaRecorder) {
            warningLog();
            return;
          }
          return mediaRecorder.blob;
        },
        /**
         * Get data-URI instead of Blob.
         * @param {function} callback - Callback to get the Data-URI.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     recorder.getDataURL(function(dataURI) {
         *         video.src = dataURI;
         *     });
         * });
         */
        getDataURL,
        /**
         * Get virtual/temporary URL. Usage of this URL is limited to current tab.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     video.src = this.toURL();
         * });
         * @returns {String} Returns a virtual/temporary URL for the recorded "Blob".
         */
        toURL: function() {
          if (!mediaRecorder) {
            warningLog();
            return;
          }
          return URL.createObjectURL(mediaRecorder.blob);
        },
        /**
         * Get internal recording object (i.e. internal module) e.g. MutliStreamRecorder, MediaStreamRecorder, StereoAudioRecorder or WhammyRecorder etc.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * var internalRecorder = recorder.getInternalRecorder();
         * if(internalRecorder instanceof MultiStreamRecorder) {
         *     internalRecorder.addStreams([newAudioStream]);
         *     internalRecorder.resetVideoStreams([screenStream]);
         * }
         * @returns {Object} Returns internal recording object.
         */
        getInternalRecorder: function() {
          return mediaRecorder;
        },
        /**
         * Invoke save-as dialog to save the recorded blob into your disk.
         * @param {string} fileName - Set your own file name.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.stopRecording(function() {
         *     this.save('file-name');
         *
         *     // or manually:
         *     invokeSaveAsDialog(this.getBlob(), 'filename.webm');
         * });
         */
        save: function(fileName) {
          if (!mediaRecorder) {
            warningLog();
            return;
          }
          invokeSaveAsDialog(mediaRecorder.blob, fileName);
        },
        /**
         * This method gets a blob from indexed-DB storage.
         * @param {function} callback - Callback to get the recorded blob.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.getFromDisk(function(dataURL) {
         *     video.src = dataURL;
         * });
         */
        getFromDisk: function(callback) {
          if (!mediaRecorder) {
            warningLog();
            return;
          }
          RecordRTC.getFromDisk(config.type, callback);
        },
        /**
         * This method appends an array of webp images to the recorded video-blob. It takes an "array" object.
         * @type {Array.<Array>}
         * @param {Array} arrayOfWebPImages - Array of webp images.
         * @method
         * @memberof RecordRTC
         * @instance
         * @todo This method should be deprecated.
         * @example
         * var arrayOfWebPImages = [];
         * arrayOfWebPImages.push({
         *     duration: index,
         *     image: 'data:image/webp;base64,...'
         * });
         * recorder.setAdvertisementArray(arrayOfWebPImages);
         */
        setAdvertisementArray: function(arrayOfWebPImages) {
          config.advertisement = [];
          var length = arrayOfWebPImages.length;
          for (var i = 0; i < length; i++) {
            config.advertisement.push({
              duration: i,
              image: arrayOfWebPImages[i]
            });
          }
        },
        /**
         * It is equivalent to <code class="str">"recorder.getBlob()"</code> method. Usage of "getBlob" is recommended, though.
         * @property {Blob} blob - Recorded Blob can be accessed using this property.
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     var blob = this.blob;
         *
         *     // below one is recommended
         *     var blob = this.getBlob();
         * });
         */
        blob: null,
        /**
         * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
         * @property {number} bufferSize - Buffer-size used to encode the WAV container
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     alert('Recorder used this buffer-size: ' + this.bufferSize);
         * });
         */
        bufferSize: 0,
        /**
         * This works only with {recorderType:StereoAudioRecorder}. Use this property on "stopRecording" to verify the encoder's sample-rates.
         * @property {number} sampleRate - Sample-rates used to encode the WAV container
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     alert('Recorder used these sample-rates: ' + this.sampleRate);
         * });
         */
        sampleRate: 0,
        /**
         * {recorderType:StereoAudioRecorder} returns ArrayBuffer object.
         * @property {ArrayBuffer} buffer - Audio ArrayBuffer, supported only in Chrome.
         * @memberof RecordRTC
         * @instance
         * @readonly
         * @example
         * recorder.stopRecording(function() {
         *     var arrayBuffer = this.buffer;
         *     alert(arrayBuffer.byteLength);
         * });
         */
        buffer: null,
        /**
         * This method resets the recorder. So that you can reuse single recorder instance many times.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.reset();
         * recorder.startRecording();
         */
        reset: function() {
          if (self.state === "recording" && !config.disableLogs) {
            console.warn("Stop an active recorder.");
          }
          if (mediaRecorder && typeof mediaRecorder.clearRecordedData === "function") {
            mediaRecorder.clearRecordedData();
          }
          mediaRecorder = null;
          setState("inactive");
          self.blob = null;
        },
        /**
         * This method is called whenever recorder's state changes. Use this as an "event".
         * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
         * @method
         * @memberof RecordRTC
         * @instance
         * @example
         * recorder.onStateChanged = function(state) {
         *     console.log('Recorder state: ', state);
         * };
         */
        onStateChanged: function(state) {
          if (!config.disableLogs) {
            console.log("Recorder state changed:", state);
          }
        },
        /**
         * A recorder can have inactive, recording, paused or stopped states.
         * @property {String} state - A recorder's state can be: recording, paused, stopped or inactive.
         * @memberof RecordRTC
         * @static
         * @readonly
         * @example
         * // this looper function will keep you updated about the recorder's states.
         * (function looper() {
         *     document.querySelector('h1').innerHTML = 'Recorder\'s state is: ' + recorder.state;
         *     if(recorder.state === 'stopped') return; // ignore+stop
         *     setTimeout(looper, 1000); // update after every 3-seconds
         * })();
         * recorder.startRecording();
         */
        state: "inactive",
        /**
         * Get recorder's readonly state.
         * @method
         * @memberof RecordRTC
         * @example
         * var state = recorder.getState();
         * @returns {String} Returns recording state.
         */
        getState: function() {
          return self.state;
        },
        /**
         * Destroy RecordRTC instance. Clear all recorders and objects.
         * @method
         * @memberof RecordRTC
         * @example
         * recorder.destroy();
         */
        destroy: function() {
          var disableLogsCache = config.disableLogs;
          config = {
            disableLogs: true
          };
          self.reset();
          setState("destroyed");
          returnObject = self = null;
          if (Storage.AudioContextConstructor) {
            Storage.AudioContextConstructor.close();
            Storage.AudioContextConstructor = null;
          }
          config.disableLogs = disableLogsCache;
          if (!config.disableLogs) {
            console.log("RecordRTC is destroyed.");
          }
        },
        /**
         * RecordRTC version number
         * @property {String} version - Release version number.
         * @memberof RecordRTC
         * @static
         * @readonly
         * @example
         * alert(recorder.version);
         */
        version: "5.6.2"
      };
      if (!this) {
        self = returnObject;
        return returnObject;
      }
      for (var prop in returnObject) {
        this[prop] = returnObject[prop];
      }
      self = this;
      return returnObject;
    }
    RecordRTC.version = "5.6.2";
    if (typeof module !== "undefined") {
      module.exports = RecordRTC;
    }
    if (typeof define === "function" && define.amd) {
      define("RecordRTC", [], function() {
        return RecordRTC;
      });
    }
    RecordRTC.getFromDisk = function(type, callback) {
      if (!callback) {
        throw "callback is mandatory.";
      }
      console.log("Getting recorded " + (type === "all" ? "blobs" : type + " blob ") + " from disk!");
      DiskStorage.Fetch(function(dataURL, _type) {
        if (type !== "all" && _type === type + "Blob" && callback) {
          callback(dataURL);
        }
        if (type === "all" && callback) {
          callback(dataURL, _type.replace("Blob", ""));
        }
      });
    };
    RecordRTC.writeToDisk = function(options) {
      console.log("Writing recorded blob(s) to disk!");
      options = options || {};
      if (options.audio && options.video && options.gif) {
        options.audio.getDataURL(function(audioDataURL) {
          options.video.getDataURL(function(videoDataURL) {
            options.gif.getDataURL(function(gifDataURL) {
              DiskStorage.Store({
                audioBlob: audioDataURL,
                videoBlob: videoDataURL,
                gifBlob: gifDataURL
              });
            });
          });
        });
      } else if (options.audio && options.video) {
        options.audio.getDataURL(function(audioDataURL) {
          options.video.getDataURL(function(videoDataURL) {
            DiskStorage.Store({
              audioBlob: audioDataURL,
              videoBlob: videoDataURL
            });
          });
        });
      } else if (options.audio && options.gif) {
        options.audio.getDataURL(function(audioDataURL) {
          options.gif.getDataURL(function(gifDataURL) {
            DiskStorage.Store({
              audioBlob: audioDataURL,
              gifBlob: gifDataURL
            });
          });
        });
      } else if (options.video && options.gif) {
        options.video.getDataURL(function(videoDataURL) {
          options.gif.getDataURL(function(gifDataURL) {
            DiskStorage.Store({
              videoBlob: videoDataURL,
              gifBlob: gifDataURL
            });
          });
        });
      } else if (options.audio) {
        options.audio.getDataURL(function(audioDataURL) {
          DiskStorage.Store({
            audioBlob: audioDataURL
          });
        });
      } else if (options.video) {
        options.video.getDataURL(function(videoDataURL) {
          DiskStorage.Store({
            videoBlob: videoDataURL
          });
        });
      } else if (options.gif) {
        options.gif.getDataURL(function(gifDataURL) {
          DiskStorage.Store({
            gifBlob: gifDataURL
          });
        });
      }
    };
    function RecordRTCConfiguration(mediaStream, config) {
      if (!config.recorderType && !config.type) {
        if (!!config.audio && !!config.video) {
          config.type = "video";
        } else if (!!config.audio && !config.video) {
          config.type = "audio";
        }
      }
      if (config.recorderType && !config.type) {
        if (config.recorderType === WhammyRecorder || config.recorderType === CanvasRecorder || typeof WebAssemblyRecorder !== "undefined" && config.recorderType === WebAssemblyRecorder) {
          config.type = "video";
        } else if (config.recorderType === GifRecorder) {
          config.type = "gif";
        } else if (config.recorderType === StereoAudioRecorder) {
          config.type = "audio";
        } else if (config.recorderType === MediaStreamRecorder) {
          if (getTracks(mediaStream, "audio").length && getTracks(mediaStream, "video").length) {
            config.type = "video";
          } else if (!getTracks(mediaStream, "audio").length && getTracks(mediaStream, "video").length) {
            config.type = "video";
          } else if (getTracks(mediaStream, "audio").length && !getTracks(mediaStream, "video").length) {
            config.type = "audio";
          } else {
          }
        }
      }
      if (typeof MediaStreamRecorder !== "undefined" && typeof MediaRecorder !== "undefined" && "requestData" in MediaRecorder.prototype) {
        if (!config.mimeType) {
          config.mimeType = "video/webm";
        }
        if (!config.type) {
          config.type = config.mimeType.split("/")[0];
        }
        if (!config.bitsPerSecond) {
        }
      }
      if (!config.type) {
        if (config.mimeType) {
          config.type = config.mimeType.split("/")[0];
        }
        if (!config.type) {
          config.type = "audio";
        }
      }
      return config;
    }
    function GetRecorderType(mediaStream, config) {
      var recorder;
      if (isChrome || isEdge || isOpera) {
        recorder = StereoAudioRecorder;
      }
      if (typeof MediaRecorder !== "undefined" && "requestData" in MediaRecorder.prototype && !isChrome) {
        recorder = MediaStreamRecorder;
      }
      if (config.type === "video" && (isChrome || isOpera)) {
        recorder = WhammyRecorder;
        if (typeof WebAssemblyRecorder !== "undefined" && typeof ReadableStream !== "undefined") {
          recorder = WebAssemblyRecorder;
        }
      }
      if (config.type === "gif") {
        recorder = GifRecorder;
      }
      if (config.type === "canvas") {
        recorder = CanvasRecorder;
      }
      if (isMediaRecorderCompatible() && recorder !== CanvasRecorder && recorder !== GifRecorder && typeof MediaRecorder !== "undefined" && "requestData" in MediaRecorder.prototype) {
        if (getTracks(mediaStream, "video").length || getTracks(mediaStream, "audio").length) {
          if (config.type === "audio") {
            if (typeof MediaRecorder.isTypeSupported === "function" && MediaRecorder.isTypeSupported("audio/webm")) {
              recorder = MediaStreamRecorder;
            }
          } else {
            if (typeof MediaRecorder.isTypeSupported === "function" && MediaRecorder.isTypeSupported("video/webm")) {
              recorder = MediaStreamRecorder;
            }
          }
        }
      }
      if (mediaStream instanceof Array && mediaStream.length) {
        recorder = MultiStreamRecorder;
      }
      if (config.recorderType) {
        recorder = config.recorderType;
      }
      if (!config.disableLogs && !!recorder && !!recorder.name) {
        console.log("Using recorderType:", recorder.name || recorder.constructor.name);
      }
      if (!recorder && isSafari) {
        recorder = MediaStreamRecorder;
      }
      return recorder;
    }
    function MRecordRTC(mediaStream) {
      this.addStream = function(_mediaStream) {
        if (_mediaStream) {
          mediaStream = _mediaStream;
        }
      };
      this.mediaType = {
        audio: true,
        video: true
      };
      this.startRecording = function() {
        var mediaType = this.mediaType;
        var recorderType;
        var mimeType = this.mimeType || {
          audio: null,
          video: null,
          gif: null
        };
        if (typeof mediaType.audio !== "function" && isMediaRecorderCompatible() && !getTracks(mediaStream, "audio").length) {
          mediaType.audio = false;
        }
        if (typeof mediaType.video !== "function" && isMediaRecorderCompatible() && !getTracks(mediaStream, "video").length) {
          mediaType.video = false;
        }
        if (typeof mediaType.gif !== "function" && isMediaRecorderCompatible() && !getTracks(mediaStream, "video").length) {
          mediaType.gif = false;
        }
        if (!mediaType.audio && !mediaType.video && !mediaType.gif) {
          throw "MediaStream must have either audio or video tracks.";
        }
        if (!!mediaType.audio) {
          recorderType = null;
          if (typeof mediaType.audio === "function") {
            recorderType = mediaType.audio;
          }
          this.audioRecorder = new RecordRTC(mediaStream, {
            type: "audio",
            bufferSize: this.bufferSize,
            sampleRate: this.sampleRate,
            numberOfAudioChannels: this.numberOfAudioChannels || 2,
            disableLogs: this.disableLogs,
            recorderType,
            mimeType: mimeType.audio,
            timeSlice: this.timeSlice,
            onTimeStamp: this.onTimeStamp
          });
          if (!mediaType.video) {
            this.audioRecorder.startRecording();
          }
        }
        if (!!mediaType.video) {
          recorderType = null;
          if (typeof mediaType.video === "function") {
            recorderType = mediaType.video;
          }
          var newStream = mediaStream;
          if (isMediaRecorderCompatible() && !!mediaType.audio && typeof mediaType.audio === "function") {
            var videoTrack = getTracks(mediaStream, "video")[0];
            if (isFirefox) {
              newStream = new MediaStream();
              newStream.addTrack(videoTrack);
              if (recorderType && recorderType === WhammyRecorder) {
                recorderType = MediaStreamRecorder;
              }
            } else {
              newStream = new MediaStream();
              newStream.addTrack(videoTrack);
            }
          }
          this.videoRecorder = new RecordRTC(newStream, {
            type: "video",
            video: this.video,
            canvas: this.canvas,
            frameInterval: this.frameInterval || 10,
            disableLogs: this.disableLogs,
            recorderType,
            mimeType: mimeType.video,
            timeSlice: this.timeSlice,
            onTimeStamp: this.onTimeStamp,
            workerPath: this.workerPath,
            webAssemblyPath: this.webAssemblyPath,
            frameRate: this.frameRate,
            // used by WebAssemblyRecorder; values: usually 30; accepts any.
            bitrate: this.bitrate
            // used by WebAssemblyRecorder; values: 0 to 1000+
          });
          if (!mediaType.audio) {
            this.videoRecorder.startRecording();
          }
        }
        if (!!mediaType.audio && !!mediaType.video) {
          var self = this;
          var isSingleRecorder = isMediaRecorderCompatible() === true;
          if (mediaType.audio instanceof StereoAudioRecorder && !!mediaType.video) {
            isSingleRecorder = false;
          } else if (mediaType.audio !== true && mediaType.video !== true && mediaType.audio !== mediaType.video) {
            isSingleRecorder = false;
          }
          if (isSingleRecorder === true) {
            self.audioRecorder = null;
            self.videoRecorder.startRecording();
          } else {
            self.videoRecorder.initRecorder(function() {
              self.audioRecorder.initRecorder(function() {
                self.videoRecorder.startRecording();
                self.audioRecorder.startRecording();
              });
            });
          }
        }
        if (!!mediaType.gif) {
          recorderType = null;
          if (typeof mediaType.gif === "function") {
            recorderType = mediaType.gif;
          }
          this.gifRecorder = new RecordRTC(mediaStream, {
            type: "gif",
            frameRate: this.frameRate || 200,
            quality: this.quality || 10,
            disableLogs: this.disableLogs,
            recorderType,
            mimeType: mimeType.gif
          });
          this.gifRecorder.startRecording();
        }
      };
      this.stopRecording = function(callback) {
        callback = callback || function() {
        };
        if (this.audioRecorder) {
          this.audioRecorder.stopRecording(function(blobURL) {
            callback(blobURL, "audio");
          });
        }
        if (this.videoRecorder) {
          this.videoRecorder.stopRecording(function(blobURL) {
            callback(blobURL, "video");
          });
        }
        if (this.gifRecorder) {
          this.gifRecorder.stopRecording(function(blobURL) {
            callback(blobURL, "gif");
          });
        }
      };
      this.pauseRecording = function() {
        if (this.audioRecorder) {
          this.audioRecorder.pauseRecording();
        }
        if (this.videoRecorder) {
          this.videoRecorder.pauseRecording();
        }
        if (this.gifRecorder) {
          this.gifRecorder.pauseRecording();
        }
      };
      this.resumeRecording = function() {
        if (this.audioRecorder) {
          this.audioRecorder.resumeRecording();
        }
        if (this.videoRecorder) {
          this.videoRecorder.resumeRecording();
        }
        if (this.gifRecorder) {
          this.gifRecorder.resumeRecording();
        }
      };
      this.getBlob = function(callback) {
        var output = {};
        if (this.audioRecorder) {
          output.audio = this.audioRecorder.getBlob();
        }
        if (this.videoRecorder) {
          output.video = this.videoRecorder.getBlob();
        }
        if (this.gifRecorder) {
          output.gif = this.gifRecorder.getBlob();
        }
        if (callback) {
          callback(output);
        }
        return output;
      };
      this.destroy = function() {
        if (this.audioRecorder) {
          this.audioRecorder.destroy();
          this.audioRecorder = null;
        }
        if (this.videoRecorder) {
          this.videoRecorder.destroy();
          this.videoRecorder = null;
        }
        if (this.gifRecorder) {
          this.gifRecorder.destroy();
          this.gifRecorder = null;
        }
      };
      this.getDataURL = function(callback) {
        this.getBlob(function(blob) {
          if (blob.audio && blob.video) {
            getDataURL(blob.audio, function(_audioDataURL) {
              getDataURL(blob.video, function(_videoDataURL) {
                callback({
                  audio: _audioDataURL,
                  video: _videoDataURL
                });
              });
            });
          } else if (blob.audio) {
            getDataURL(blob.audio, function(_audioDataURL) {
              callback({
                audio: _audioDataURL
              });
            });
          } else if (blob.video) {
            getDataURL(blob.video, function(_videoDataURL) {
              callback({
                video: _videoDataURL
              });
            });
          }
        });
        function getDataURL(blob, callback00) {
          if (typeof Worker !== "undefined") {
            var webWorker = processInWebWorker(function readFile(_blob) {
              postMessage(new FileReaderSync().readAsDataURL(_blob));
            });
            webWorker.onmessage = function(event) {
              callback00(event.data);
            };
            webWorker.postMessage(blob);
          } else {
            var reader = new FileReader();
            reader.readAsDataURL(blob);
            reader.onload = function(event) {
              callback00(event.target.result);
            };
          }
        }
        function processInWebWorker(_function) {
          var blob = URL.createObjectURL(new Blob([
            _function.toString(),
            "this.onmessage =  function (eee) {" + _function.name + "(eee.data);}"
          ], {
            type: "application/javascript"
          }));
          var worker = new Worker(blob);
          var url;
          if (typeof URL !== "undefined") {
            url = URL;
          } else if (typeof webkitURL !== "undefined") {
            url = webkitURL;
          } else {
            throw "Neither URL nor webkitURL detected.";
          }
          url.revokeObjectURL(blob);
          return worker;
        }
      };
      this.writeToDisk = function() {
        RecordRTC.writeToDisk({
          audio: this.audioRecorder,
          video: this.videoRecorder,
          gif: this.gifRecorder
        });
      };
      this.save = function(args) {
        args = args || {
          audio: true,
          video: true,
          gif: true
        };
        if (!!args.audio && this.audioRecorder) {
          this.audioRecorder.save(typeof args.audio === "string" ? args.audio : "");
        }
        if (!!args.video && this.videoRecorder) {
          this.videoRecorder.save(typeof args.video === "string" ? args.video : "");
        }
        if (!!args.gif && this.gifRecorder) {
          this.gifRecorder.save(typeof args.gif === "string" ? args.gif : "");
        }
      };
    }
    MRecordRTC.getFromDisk = RecordRTC.getFromDisk;
    MRecordRTC.writeToDisk = RecordRTC.writeToDisk;
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.MRecordRTC = MRecordRTC;
    }
    var browserFakeUserAgent = "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45";
    (function(that) {
      if (!that) {
        return;
      }
      if (typeof window !== "undefined") {
        return;
      }
      if (typeof global === "undefined") {
        return;
      }
      global.navigator = {
        userAgent: browserFakeUserAgent,
        getUserMedia: function() {
        }
      };
      if (!global.console) {
        global.console = {};
      }
      if (typeof global.console.log === "undefined" || typeof global.console.error === "undefined") {
        global.console.error = global.console.log = global.console.log || function() {
          console.log(arguments);
        };
      }
      if (typeof document === "undefined") {
        that.document = {
          documentElement: {
            appendChild: function() {
              return "";
            }
          }
        };
        document.createElement = document.captureStream = document.mozCaptureStream = function() {
          var obj = {
            getContext: function() {
              return obj;
            },
            play: function() {
            },
            pause: function() {
            },
            drawImage: function() {
            },
            toDataURL: function() {
              return "";
            },
            style: {}
          };
          return obj;
        };
        that.HTMLVideoElement = function() {
        };
      }
      if (typeof location === "undefined") {
        that.location = {
          protocol: "file:",
          href: "",
          hash: ""
        };
      }
      if (typeof screen === "undefined") {
        that.screen = {
          width: 0,
          height: 0
        };
      }
      if (typeof URL === "undefined") {
        that.URL = {
          createObjectURL: function() {
            return "";
          },
          revokeObjectURL: function() {
            return "";
          }
        };
      }
      that.window = global;
    })(typeof global !== "undefined" ? global : null);
    var requestAnimationFrame = window.requestAnimationFrame;
    if (typeof requestAnimationFrame === "undefined") {
      if (typeof webkitRequestAnimationFrame !== "undefined") {
        requestAnimationFrame = webkitRequestAnimationFrame;
      } else if (typeof mozRequestAnimationFrame !== "undefined") {
        requestAnimationFrame = mozRequestAnimationFrame;
      } else if (typeof msRequestAnimationFrame !== "undefined") {
        requestAnimationFrame = msRequestAnimationFrame;
      } else if (typeof requestAnimationFrame === "undefined") {
        lastTime = 0;
        requestAnimationFrame = function(callback, element) {
          var currTime = (/* @__PURE__ */ new Date()).getTime();
          var timeToCall = Math.max(0, 16 - (currTime - lastTime));
          var id = setTimeout(function() {
            callback(currTime + timeToCall);
          }, timeToCall);
          lastTime = currTime + timeToCall;
          return id;
        };
      }
    }
    var lastTime;
    var cancelAnimationFrame = window.cancelAnimationFrame;
    if (typeof cancelAnimationFrame === "undefined") {
      if (typeof webkitCancelAnimationFrame !== "undefined") {
        cancelAnimationFrame = webkitCancelAnimationFrame;
      } else if (typeof mozCancelAnimationFrame !== "undefined") {
        cancelAnimationFrame = mozCancelAnimationFrame;
      } else if (typeof msCancelAnimationFrame !== "undefined") {
        cancelAnimationFrame = msCancelAnimationFrame;
      } else if (typeof cancelAnimationFrame === "undefined") {
        cancelAnimationFrame = function(id) {
          clearTimeout(id);
        };
      }
    }
    var AudioContext = window.AudioContext;
    if (typeof AudioContext === "undefined") {
      if (typeof webkitAudioContext !== "undefined") {
        AudioContext = webkitAudioContext;
      }
      if (typeof mozAudioContext !== "undefined") {
        AudioContext = mozAudioContext;
      }
    }
    var URL = window.URL;
    if (typeof URL === "undefined" && typeof webkitURL !== "undefined") {
      URL = webkitURL;
    }
    if (typeof navigator !== "undefined" && typeof navigator.getUserMedia === "undefined") {
      if (typeof navigator.webkitGetUserMedia !== "undefined") {
        navigator.getUserMedia = navigator.webkitGetUserMedia;
      }
      if (typeof navigator.mozGetUserMedia !== "undefined") {
        navigator.getUserMedia = navigator.mozGetUserMedia;
      }
    }
    var isEdge = navigator.userAgent.indexOf("Edge") !== -1 && (!!navigator.msSaveBlob || !!navigator.msSaveOrOpenBlob);
    var isOpera = !!window.opera || navigator.userAgent.indexOf("OPR/") !== -1;
    var isFirefox = navigator.userAgent.toLowerCase().indexOf("firefox") > -1 && "netscape" in window && / rv:/.test(navigator.userAgent);
    var isChrome = !isOpera && !isEdge && !!navigator.webkitGetUserMedia || isElectron() || navigator.userAgent.toLowerCase().indexOf("chrome/") !== -1;
    var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    if (isSafari && !isChrome && navigator.userAgent.indexOf("CriOS") !== -1) {
      isSafari = false;
      isChrome = true;
    }
    var MediaStream = window.MediaStream;
    if (typeof MediaStream === "undefined" && typeof webkitMediaStream !== "undefined") {
      MediaStream = webkitMediaStream;
    }
    if (typeof MediaStream !== "undefined") {
      if (typeof MediaStream.prototype.stop === "undefined") {
        MediaStream.prototype.stop = function() {
          this.getTracks().forEach(function(track) {
            track.stop();
          });
        };
      }
    }
    function bytesToSize(bytes) {
      var k = 1e3;
      var sizes = ["Bytes", "KB", "MB", "GB", "TB"];
      if (bytes === 0) {
        return "0 Bytes";
      }
      var i = parseInt(Math.floor(Math.log(bytes) / Math.log(k)), 10);
      return (bytes / Math.pow(k, i)).toPrecision(3) + " " + sizes[i];
    }
    function invokeSaveAsDialog(file, fileName) {
      if (!file) {
        throw "Blob object is required.";
      }
      if (!file.type) {
        try {
          file.type = "video/webm";
        } catch (e) {
        }
      }
      var fileExtension = (file.type || "video/webm").split("/")[1];
      if (fileExtension.indexOf(";") !== -1) {
        fileExtension = fileExtension.split(";")[0];
      }
      if (fileName && fileName.indexOf(".") !== -1) {
        var splitted = fileName.split(".");
        fileName = splitted[0];
        fileExtension = splitted[1];
      }
      var fileFullName = (fileName || Math.round(Math.random() * 9999999999) + 888888888) + "." + fileExtension;
      if (typeof navigator.msSaveOrOpenBlob !== "undefined") {
        return navigator.msSaveOrOpenBlob(file, fileFullName);
      } else if (typeof navigator.msSaveBlob !== "undefined") {
        return navigator.msSaveBlob(file, fileFullName);
      }
      var hyperlink = document.createElement("a");
      hyperlink.href = URL.createObjectURL(file);
      hyperlink.download = fileFullName;
      hyperlink.style = "display:none;opacity:0;color:transparent;";
      (document.body || document.documentElement).appendChild(hyperlink);
      if (typeof hyperlink.click === "function") {
        hyperlink.click();
      } else {
        hyperlink.target = "_blank";
        hyperlink.dispatchEvent(new MouseEvent("click", {
          view: window,
          bubbles: true,
          cancelable: true
        }));
      }
      URL.revokeObjectURL(hyperlink.href);
    }
    function isElectron() {
      if (typeof window !== "undefined" && typeof window.process === "object" && window.process.type === "renderer") {
        return true;
      }
      if (typeof process !== "undefined" && typeof process.versions === "object" && !!process.versions.electron) {
        return true;
      }
      if (typeof navigator === "object" && typeof navigator.userAgent === "string" && navigator.userAgent.indexOf("Electron") >= 0) {
        return true;
      }
      return false;
    }
    function getTracks(stream, kind) {
      if (!stream || !stream.getTracks) {
        return [];
      }
      return stream.getTracks().filter(function(t) {
        return t.kind === (kind || "audio");
      });
    }
    function setSrcObject(stream, element) {
      if ("srcObject" in element) {
        element.srcObject = stream;
      } else if ("mozSrcObject" in element) {
        element.mozSrcObject = stream;
      } else {
        element.srcObject = stream;
      }
    }
    function getSeekableBlob(inputBlob, callback) {
      if (typeof EBML === "undefined") {
        throw new Error("Please link: https://www.webrtc-experiment.com/EBML.js");
      }
      var reader = new EBML.Reader();
      var decoder = new EBML.Decoder();
      var tools = EBML.tools;
      var fileReader = new FileReader();
      fileReader.onload = function(e) {
        var ebmlElms = decoder.decode(this.result);
        ebmlElms.forEach(function(element) {
          reader.read(element);
        });
        reader.stop();
        var refinedMetadataBuf = tools.makeMetadataSeekable(reader.metadatas, reader.duration, reader.cues);
        var body = this.result.slice(reader.metadataSize);
        var newBlob = new Blob([refinedMetadataBuf, body], {
          type: "video/webm"
        });
        callback(newBlob);
      };
      fileReader.readAsArrayBuffer(inputBlob);
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.invokeSaveAsDialog = invokeSaveAsDialog;
      RecordRTC.getTracks = getTracks;
      RecordRTC.getSeekableBlob = getSeekableBlob;
      RecordRTC.bytesToSize = bytesToSize;
      RecordRTC.isElectron = isElectron;
    }
    var Storage = {};
    if (typeof AudioContext !== "undefined") {
      Storage.AudioContext = AudioContext;
    } else if (typeof webkitAudioContext !== "undefined") {
      Storage.AudioContext = webkitAudioContext;
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.Storage = Storage;
    }
    function isMediaRecorderCompatible() {
      if (isFirefox || isSafari || isEdge) {
        return true;
      }
      var nVer = navigator.appVersion;
      var nAgt = navigator.userAgent;
      var fullVersion = "" + parseFloat(navigator.appVersion);
      var majorVersion = parseInt(navigator.appVersion, 10);
      var nameOffset, verOffset, ix;
      if (isChrome || isOpera) {
        verOffset = nAgt.indexOf("Chrome");
        fullVersion = nAgt.substring(verOffset + 7);
      }
      if ((ix = fullVersion.indexOf(";")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
      }
      if ((ix = fullVersion.indexOf(" ")) !== -1) {
        fullVersion = fullVersion.substring(0, ix);
      }
      majorVersion = parseInt("" + fullVersion, 10);
      if (isNaN(majorVersion)) {
        fullVersion = "" + parseFloat(navigator.appVersion);
        majorVersion = parseInt(navigator.appVersion, 10);
      }
      return majorVersion >= 49;
    }
    function MediaStreamRecorder(mediaStream, config) {
      var self = this;
      if (typeof mediaStream === "undefined") {
        throw 'First argument "MediaStream" is required.';
      }
      if (typeof MediaRecorder === "undefined") {
        throw "Your browser does not support the Media Recorder API. Please try other modules e.g. WhammyRecorder or StereoAudioRecorder.";
      }
      config = config || {
        // bitsPerSecond: 256 * 8 * 1024,
        mimeType: "video/webm"
      };
      if (config.type === "audio") {
        if (getTracks(mediaStream, "video").length && getTracks(mediaStream, "audio").length) {
          var stream;
          if (!!navigator.mozGetUserMedia) {
            stream = new MediaStream();
            stream.addTrack(getTracks(mediaStream, "audio")[0]);
          } else {
            stream = new MediaStream(getTracks(mediaStream, "audio"));
          }
          mediaStream = stream;
        }
        if (!config.mimeType || config.mimeType.toString().toLowerCase().indexOf("audio") === -1) {
          config.mimeType = isChrome ? "audio/webm" : "audio/ogg";
        }
        if (config.mimeType && config.mimeType.toString().toLowerCase() !== "audio/ogg" && !!navigator.mozGetUserMedia) {
          config.mimeType = "audio/ogg";
        }
      }
      var arrayOfBlobs = [];
      this.getArrayOfBlobs = function() {
        return arrayOfBlobs;
      };
      this.record = function() {
        self.blob = null;
        self.clearRecordedData();
        self.timestamps = [];
        allStates = [];
        arrayOfBlobs = [];
        var recorderHints = config;
        if (!config.disableLogs) {
          console.log("Passing following config over MediaRecorder API.", recorderHints);
        }
        if (mediaRecorder) {
          mediaRecorder = null;
        }
        if (isChrome && !isMediaRecorderCompatible()) {
          recorderHints = "video/vp8";
        }
        if (typeof MediaRecorder.isTypeSupported === "function" && recorderHints.mimeType) {
          if (!MediaRecorder.isTypeSupported(recorderHints.mimeType)) {
            if (!config.disableLogs) {
              console.warn("MediaRecorder API seems unable to record mimeType:", recorderHints.mimeType);
            }
            recorderHints.mimeType = config.type === "audio" ? "audio/webm" : "video/webm";
          }
        }
        try {
          mediaRecorder = new MediaRecorder(mediaStream, recorderHints);
          config.mimeType = recorderHints.mimeType;
        } catch (e) {
          mediaRecorder = new MediaRecorder(mediaStream);
        }
        if (recorderHints.mimeType && !MediaRecorder.isTypeSupported && "canRecordMimeType" in mediaRecorder && mediaRecorder.canRecordMimeType(recorderHints.mimeType) === false) {
          if (!config.disableLogs) {
            console.warn("MediaRecorder API seems unable to record mimeType:", recorderHints.mimeType);
          }
        }
        mediaRecorder.ondataavailable = function(e) {
          if (e.data) {
            allStates.push("ondataavailable: " + bytesToSize(e.data.size));
          }
          if (typeof config.timeSlice === "number") {
            if (e.data && e.data.size) {
              arrayOfBlobs.push(e.data);
              updateTimeStamp();
              if (typeof config.ondataavailable === "function") {
                var blob = config.getNativeBlob ? e.data : new Blob([e.data], {
                  type: getMimeType(recorderHints)
                });
                config.ondataavailable(blob);
              }
            }
            return;
          }
          if (!e.data || !e.data.size || e.data.size < 100 || self.blob) {
            if (self.recordingCallback) {
              self.recordingCallback(new Blob([], {
                type: getMimeType(recorderHints)
              }));
              self.recordingCallback = null;
            }
            return;
          }
          self.blob = config.getNativeBlob ? e.data : new Blob([e.data], {
            type: getMimeType(recorderHints)
          });
          if (self.recordingCallback) {
            self.recordingCallback(self.blob);
            self.recordingCallback = null;
          }
        };
        mediaRecorder.onstart = function() {
          allStates.push("started");
        };
        mediaRecorder.onpause = function() {
          allStates.push("paused");
        };
        mediaRecorder.onresume = function() {
          allStates.push("resumed");
        };
        mediaRecorder.onstop = function() {
          allStates.push("stopped");
        };
        mediaRecorder.onerror = function(error) {
          if (!error) {
            return;
          }
          if (!error.name) {
            error.name = "UnknownError";
          }
          allStates.push("error: " + error);
          if (!config.disableLogs) {
            if (error.name.toString().toLowerCase().indexOf("invalidstate") !== -1) {
              console.error("The MediaRecorder is not in a state in which the proposed operation is allowed to be executed.", error);
            } else if (error.name.toString().toLowerCase().indexOf("notsupported") !== -1) {
              console.error("MIME type (", recorderHints.mimeType, ") is not supported.", error);
            } else if (error.name.toString().toLowerCase().indexOf("security") !== -1) {
              console.error("MediaRecorder security error", error);
            } else if (error.name === "OutOfMemory") {
              console.error("The UA has exhaused the available memory. User agents SHOULD provide as much additional information as possible in the message attribute.", error);
            } else if (error.name === "IllegalStreamModification") {
              console.error("A modification to the stream has occurred that makes it impossible to continue recording. An example would be the addition of a Track while recording is occurring. User agents SHOULD provide as much additional information as possible in the message attribute.", error);
            } else if (error.name === "OtherRecordingError") {
              console.error("Used for an fatal error other than those listed above. User agents SHOULD provide as much additional information as possible in the message attribute.", error);
            } else if (error.name === "GenericError") {
              console.error("The UA cannot provide the codec or recording option that has been requested.", error);
            } else {
              console.error("MediaRecorder Error", error);
            }
          }
          (function(looper) {
            if (!self.manuallyStopped && mediaRecorder && mediaRecorder.state === "inactive") {
              delete config.timeslice;
              mediaRecorder.start(10 * 60 * 1e3);
              return;
            }
            setTimeout(looper, 1e3);
          })();
          if (mediaRecorder.state !== "inactive" && mediaRecorder.state !== "stopped") {
            mediaRecorder.stop();
          }
        };
        if (typeof config.timeSlice === "number") {
          updateTimeStamp();
          mediaRecorder.start(config.timeSlice);
        } else {
          mediaRecorder.start(36e5);
        }
        if (config.initCallback) {
          config.initCallback();
        }
      };
      this.timestamps = [];
      function updateTimeStamp() {
        self.timestamps.push((/* @__PURE__ */ new Date()).getTime());
        if (typeof config.onTimeStamp === "function") {
          config.onTimeStamp(self.timestamps[self.timestamps.length - 1], self.timestamps);
        }
      }
      function getMimeType(secondObject) {
        if (mediaRecorder && mediaRecorder.mimeType) {
          return mediaRecorder.mimeType;
        }
        return secondObject.mimeType || "video/webm";
      }
      this.stop = function(callback) {
        callback = callback || function() {
        };
        self.manuallyStopped = true;
        if (!mediaRecorder) {
          return;
        }
        this.recordingCallback = callback;
        if (mediaRecorder.state === "recording") {
          mediaRecorder.stop();
        }
        if (typeof config.timeSlice === "number") {
          setTimeout(function() {
            self.blob = new Blob(arrayOfBlobs, {
              type: getMimeType(config)
            });
            self.recordingCallback(self.blob);
          }, 100);
        }
      };
      this.pause = function() {
        if (!mediaRecorder) {
          return;
        }
        if (mediaRecorder.state === "recording") {
          mediaRecorder.pause();
        }
      };
      this.resume = function() {
        if (!mediaRecorder) {
          return;
        }
        if (mediaRecorder.state === "paused") {
          mediaRecorder.resume();
        }
      };
      this.clearRecordedData = function() {
        if (mediaRecorder && mediaRecorder.state === "recording") {
          self.stop(clearRecordedDataCB);
        }
        clearRecordedDataCB();
      };
      function clearRecordedDataCB() {
        arrayOfBlobs = [];
        mediaRecorder = null;
        self.timestamps = [];
      }
      var mediaRecorder;
      this.getInternalRecorder = function() {
        return mediaRecorder;
      };
      function isMediaStreamActive() {
        if ("active" in mediaStream) {
          if (!mediaStream.active) {
            return false;
          }
        } else if ("ended" in mediaStream) {
          if (mediaStream.ended) {
            return false;
          }
        }
        return true;
      }
      this.blob = null;
      this.getState = function() {
        if (!mediaRecorder) {
          return "inactive";
        }
        return mediaRecorder.state || "inactive";
      };
      var allStates = [];
      this.getAllStates = function() {
        return allStates;
      };
      if (typeof config.checkForInactiveTracks === "undefined") {
        config.checkForInactiveTracks = false;
      }
      var self = this;
      (function looper() {
        if (!mediaRecorder || config.checkForInactiveTracks === false) {
          return;
        }
        if (isMediaStreamActive() === false) {
          if (!config.disableLogs) {
            console.log("MediaStream seems stopped.");
          }
          self.stop();
          return;
        }
        setTimeout(looper, 1e3);
      })();
      this.name = "MediaStreamRecorder";
      this.toString = function() {
        return this.name;
      };
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.MediaStreamRecorder = MediaStreamRecorder;
    }
    function StereoAudioRecorder(mediaStream, config) {
      if (!getTracks(mediaStream, "audio").length) {
        throw "Your stream has no audio tracks.";
      }
      config = config || {};
      var self = this;
      var leftchannel = [];
      var rightchannel = [];
      var recording = false;
      var recordingLength = 0;
      var jsAudioNode;
      var numberOfAudioChannels = 2;
      var desiredSampRate = config.desiredSampRate;
      if (config.leftChannel === true) {
        numberOfAudioChannels = 1;
      }
      if (config.numberOfAudioChannels === 1) {
        numberOfAudioChannels = 1;
      }
      if (!numberOfAudioChannels || numberOfAudioChannels < 1) {
        numberOfAudioChannels = 2;
      }
      if (!config.disableLogs) {
        console.log("StereoAudioRecorder is set to record number of channels: " + numberOfAudioChannels);
      }
      if (typeof config.checkForInactiveTracks === "undefined") {
        config.checkForInactiveTracks = true;
      }
      function isMediaStreamActive() {
        if (config.checkForInactiveTracks === false) {
          return true;
        }
        if ("active" in mediaStream) {
          if (!mediaStream.active) {
            return false;
          }
        } else if ("ended" in mediaStream) {
          if (mediaStream.ended) {
            return false;
          }
        }
        return true;
      }
      this.record = function() {
        if (isMediaStreamActive() === false) {
          throw "Please make sure MediaStream is active.";
        }
        resetVariables();
        isAudioProcessStarted = isPaused = false;
        recording = true;
        if (typeof config.timeSlice !== "undefined") {
          looper();
        }
      };
      function mergeLeftRightBuffers(config2, callback) {
        function mergeAudioBuffers(config3, cb) {
          var numberOfAudioChannels2 = config3.numberOfAudioChannels;
          var leftBuffers = config3.leftBuffers.slice(0);
          var rightBuffers = config3.rightBuffers.slice(0);
          var sampleRate2 = config3.sampleRate;
          var internalInterleavedLength = config3.internalInterleavedLength;
          var desiredSampRate2 = config3.desiredSampRate;
          if (numberOfAudioChannels2 === 2) {
            leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
            rightBuffers = mergeBuffers(rightBuffers, internalInterleavedLength);
            if (desiredSampRate2) {
              leftBuffers = interpolateArray(leftBuffers, desiredSampRate2, sampleRate2);
              rightBuffers = interpolateArray(rightBuffers, desiredSampRate2, sampleRate2);
            }
          }
          if (numberOfAudioChannels2 === 1) {
            leftBuffers = mergeBuffers(leftBuffers, internalInterleavedLength);
            if (desiredSampRate2) {
              leftBuffers = interpolateArray(leftBuffers, desiredSampRate2, sampleRate2);
            }
          }
          if (desiredSampRate2) {
            sampleRate2 = desiredSampRate2;
          }
          function interpolateArray(data, newSampleRate, oldSampleRate) {
            var fitCount = Math.round(data.length * (newSampleRate / oldSampleRate));
            var newData = [];
            var springFactor = Number((data.length - 1) / (fitCount - 1));
            newData[0] = data[0];
            for (var i2 = 1; i2 < fitCount - 1; i2++) {
              var tmp = i2 * springFactor;
              var before = Number(Math.floor(tmp)).toFixed();
              var after = Number(Math.ceil(tmp)).toFixed();
              var atPoint = tmp - before;
              newData[i2] = linearInterpolate(data[before], data[after], atPoint);
            }
            newData[fitCount - 1] = data[data.length - 1];
            return newData;
          }
          function linearInterpolate(before, after, atPoint) {
            return before + (after - before) * atPoint;
          }
          function mergeBuffers(channelBuffer, rLength) {
            var result = new Float64Array(rLength);
            var offset = 0;
            var lng2 = channelBuffer.length;
            for (var i2 = 0; i2 < lng2; i2++) {
              var buffer2 = channelBuffer[i2];
              result.set(buffer2, offset);
              offset += buffer2.length;
            }
            return result;
          }
          function interleave(leftChannel, rightChannel) {
            var length = leftChannel.length + rightChannel.length;
            var result = new Float64Array(length);
            var inputIndex = 0;
            for (var index2 = 0; index2 < length; ) {
              result[index2++] = leftChannel[inputIndex];
              result[index2++] = rightChannel[inputIndex];
              inputIndex++;
            }
            return result;
          }
          function writeUTFBytes(view2, offset, string) {
            var lng2 = string.length;
            for (var i2 = 0; i2 < lng2; i2++) {
              view2.setUint8(offset + i2, string.charCodeAt(i2));
            }
          }
          var interleaved;
          if (numberOfAudioChannels2 === 2) {
            interleaved = interleave(leftBuffers, rightBuffers);
          }
          if (numberOfAudioChannels2 === 1) {
            interleaved = leftBuffers;
          }
          var interleavedLength = interleaved.length;
          var resultingBufferLength = 44 + interleavedLength * 2;
          var buffer = new ArrayBuffer(resultingBufferLength);
          var view = new DataView(buffer);
          writeUTFBytes(view, 0, "RIFF");
          view.setUint32(4, 36 + interleavedLength * 2, true);
          writeUTFBytes(view, 8, "WAVE");
          writeUTFBytes(view, 12, "fmt ");
          view.setUint32(16, 16, true);
          view.setUint16(20, 1, true);
          view.setUint16(22, numberOfAudioChannels2, true);
          view.setUint32(24, sampleRate2, true);
          view.setUint32(28, sampleRate2 * numberOfAudioChannels2 * 2, true);
          view.setUint16(32, numberOfAudioChannels2 * 2, true);
          view.setUint16(34, 16, true);
          writeUTFBytes(view, 36, "data");
          view.setUint32(40, interleavedLength * 2, true);
          var lng = interleavedLength;
          var index = 44;
          var volume = 1;
          for (var i = 0; i < lng; i++) {
            view.setInt16(index, interleaved[i] * (32767 * volume), true);
            index += 2;
          }
          if (cb) {
            return cb({
              buffer,
              view
            });
          }
          postMessage({
            buffer,
            view
          });
        }
        if (config2.noWorker) {
          mergeAudioBuffers(config2, function(data) {
            callback(data.buffer, data.view);
          });
          return;
        }
        var webWorker = processInWebWorker(mergeAudioBuffers);
        webWorker.onmessage = function(event) {
          callback(event.data.buffer, event.data.view);
          URL.revokeObjectURL(webWorker.workerURL);
          webWorker.terminate();
        };
        webWorker.postMessage(config2);
      }
      function processInWebWorker(_function) {
        var workerURL = URL.createObjectURL(new Blob([
          _function.toString(),
          ";this.onmessage =  function (eee) {" + _function.name + "(eee.data);}"
        ], {
          type: "application/javascript"
        }));
        var worker = new Worker(workerURL);
        worker.workerURL = workerURL;
        return worker;
      }
      this.stop = function(callback) {
        callback = callback || function() {
        };
        recording = false;
        mergeLeftRightBuffers({
          desiredSampRate,
          sampleRate,
          numberOfAudioChannels,
          internalInterleavedLength: recordingLength,
          leftBuffers: leftchannel,
          rightBuffers: numberOfAudioChannels === 1 ? [] : rightchannel,
          noWorker: config.noWorker
        }, function(buffer, view) {
          self.blob = new Blob([view], {
            type: "audio/wav"
          });
          self.buffer = new ArrayBuffer(view.buffer.byteLength);
          self.view = view;
          self.sampleRate = desiredSampRate || sampleRate;
          self.bufferSize = bufferSize;
          self.length = recordingLength;
          isAudioProcessStarted = false;
          if (callback) {
            callback(self.blob);
          }
        });
      };
      if (typeof RecordRTC.Storage === "undefined") {
        RecordRTC.Storage = {
          AudioContextConstructor: null,
          AudioContext: window.AudioContext || window.webkitAudioContext
        };
      }
      if (!RecordRTC.Storage.AudioContextConstructor || RecordRTC.Storage.AudioContextConstructor.state === "closed") {
        RecordRTC.Storage.AudioContextConstructor = new RecordRTC.Storage.AudioContext();
      }
      var context = RecordRTC.Storage.AudioContextConstructor;
      var audioInput = context.createMediaStreamSource(mediaStream);
      var legalBufferValues = [0, 256, 512, 1024, 2048, 4096, 8192, 16384];
      var bufferSize = typeof config.bufferSize === "undefined" ? 4096 : config.bufferSize;
      if (legalBufferValues.indexOf(bufferSize) === -1) {
        if (!config.disableLogs) {
          console.log("Legal values for buffer-size are " + JSON.stringify(legalBufferValues, null, "	"));
        }
      }
      if (context.createJavaScriptNode) {
        jsAudioNode = context.createJavaScriptNode(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
      } else if (context.createScriptProcessor) {
        jsAudioNode = context.createScriptProcessor(bufferSize, numberOfAudioChannels, numberOfAudioChannels);
      } else {
        throw "WebAudio API has no support on this browser.";
      }
      audioInput.connect(jsAudioNode);
      if (!config.bufferSize) {
        bufferSize = jsAudioNode.bufferSize;
      }
      var sampleRate = typeof config.sampleRate !== "undefined" ? config.sampleRate : context.sampleRate || 44100;
      if (sampleRate < 22050 || sampleRate > 96e3) {
        if (!config.disableLogs) {
          console.log("sample-rate must be under range 22050 and 96000.");
        }
      }
      if (!config.disableLogs) {
        if (config.desiredSampRate) {
          console.log("Desired sample-rate: " + config.desiredSampRate);
        }
      }
      var isPaused = false;
      this.pause = function() {
        isPaused = true;
      };
      this.resume = function() {
        if (isMediaStreamActive() === false) {
          throw "Please make sure MediaStream is active.";
        }
        if (!recording) {
          if (!config.disableLogs) {
            console.log("Seems recording has been restarted.");
          }
          this.record();
          return;
        }
        isPaused = false;
      };
      this.clearRecordedData = function() {
        config.checkForInactiveTracks = false;
        if (recording) {
          this.stop(clearRecordedDataCB);
        }
        clearRecordedDataCB();
      };
      function resetVariables() {
        leftchannel = [];
        rightchannel = [];
        recordingLength = 0;
        isAudioProcessStarted = false;
        recording = false;
        isPaused = false;
        context = null;
        self.leftchannel = leftchannel;
        self.rightchannel = rightchannel;
        self.numberOfAudioChannels = numberOfAudioChannels;
        self.desiredSampRate = desiredSampRate;
        self.sampleRate = sampleRate;
        self.recordingLength = recordingLength;
        intervalsBasedBuffers = {
          left: [],
          right: [],
          recordingLength: 0
        };
      }
      function clearRecordedDataCB() {
        if (jsAudioNode) {
          jsAudioNode.onaudioprocess = null;
          jsAudioNode.disconnect();
          jsAudioNode = null;
        }
        if (audioInput) {
          audioInput.disconnect();
          audioInput = null;
        }
        resetVariables();
      }
      this.name = "StereoAudioRecorder";
      this.toString = function() {
        return this.name;
      };
      var isAudioProcessStarted = false;
      function onAudioProcessDataAvailable(e) {
        if (isPaused) {
          return;
        }
        if (isMediaStreamActive() === false) {
          if (!config.disableLogs) {
            console.log("MediaStream seems stopped.");
          }
          jsAudioNode.disconnect();
          recording = false;
        }
        if (!recording) {
          if (audioInput) {
            audioInput.disconnect();
            audioInput = null;
          }
          return;
        }
        if (!isAudioProcessStarted) {
          isAudioProcessStarted = true;
          if (config.onAudioProcessStarted) {
            config.onAudioProcessStarted();
          }
          if (config.initCallback) {
            config.initCallback();
          }
        }
        var left = e.inputBuffer.getChannelData(0);
        var chLeft = new Float32Array(left);
        leftchannel.push(chLeft);
        if (numberOfAudioChannels === 2) {
          var right = e.inputBuffer.getChannelData(1);
          var chRight = new Float32Array(right);
          rightchannel.push(chRight);
        }
        recordingLength += bufferSize;
        self.recordingLength = recordingLength;
        if (typeof config.timeSlice !== "undefined") {
          intervalsBasedBuffers.recordingLength += bufferSize;
          intervalsBasedBuffers.left.push(chLeft);
          if (numberOfAudioChannels === 2) {
            intervalsBasedBuffers.right.push(chRight);
          }
        }
      }
      jsAudioNode.onaudioprocess = onAudioProcessDataAvailable;
      if (context.createMediaStreamDestination) {
        jsAudioNode.connect(context.createMediaStreamDestination());
      } else {
        jsAudioNode.connect(context.destination);
      }
      this.leftchannel = leftchannel;
      this.rightchannel = rightchannel;
      this.numberOfAudioChannels = numberOfAudioChannels;
      this.desiredSampRate = desiredSampRate;
      this.sampleRate = sampleRate;
      self.recordingLength = recordingLength;
      var intervalsBasedBuffers = {
        left: [],
        right: [],
        recordingLength: 0
      };
      function looper() {
        if (!recording || typeof config.ondataavailable !== "function" || typeof config.timeSlice === "undefined") {
          return;
        }
        if (intervalsBasedBuffers.left.length) {
          mergeLeftRightBuffers({
            desiredSampRate,
            sampleRate,
            numberOfAudioChannels,
            internalInterleavedLength: intervalsBasedBuffers.recordingLength,
            leftBuffers: intervalsBasedBuffers.left,
            rightBuffers: numberOfAudioChannels === 1 ? [] : intervalsBasedBuffers.right
          }, function(buffer, view) {
            var blob = new Blob([view], {
              type: "audio/wav"
            });
            config.ondataavailable(blob);
            setTimeout(looper, config.timeSlice);
          });
          intervalsBasedBuffers = {
            left: [],
            right: [],
            recordingLength: 0
          };
        } else {
          setTimeout(looper, config.timeSlice);
        }
      }
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.StereoAudioRecorder = StereoAudioRecorder;
    }
    function CanvasRecorder(htmlElement, config) {
      if (typeof html2canvas === "undefined") {
        throw "Please link: https://www.webrtc-experiment.com/screenshot.js";
      }
      config = config || {};
      if (!config.frameInterval) {
        config.frameInterval = 10;
      }
      var isCanvasSupportsStreamCapturing = false;
      ["captureStream", "mozCaptureStream", "webkitCaptureStream"].forEach(function(item) {
        if (item in document.createElement("canvas")) {
          isCanvasSupportsStreamCapturing = true;
        }
      });
      var _isChrome = (!!window.webkitRTCPeerConnection || !!window.webkitGetUserMedia) && !!window.chrome;
      var chromeVersion = 50;
      var matchArray = navigator.userAgent.match(/Chrom(e|ium)\/([0-9]+)\./);
      if (_isChrome && matchArray && matchArray[2]) {
        chromeVersion = parseInt(matchArray[2], 10);
      }
      if (_isChrome && chromeVersion < 52) {
        isCanvasSupportsStreamCapturing = false;
      }
      if (config.useWhammyRecorder) {
        isCanvasSupportsStreamCapturing = false;
      }
      var globalCanvas, mediaStreamRecorder;
      if (isCanvasSupportsStreamCapturing) {
        if (!config.disableLogs) {
          console.log("Your browser supports both MediRecorder API and canvas.captureStream!");
        }
        if (htmlElement instanceof HTMLCanvasElement) {
          globalCanvas = htmlElement;
        } else if (htmlElement instanceof CanvasRenderingContext2D) {
          globalCanvas = htmlElement.canvas;
        } else {
          throw "Please pass either HTMLCanvasElement or CanvasRenderingContext2D.";
        }
      } else if (!!navigator.mozGetUserMedia) {
        if (!config.disableLogs) {
          console.error("Canvas recording is NOT supported in Firefox.");
        }
      }
      var isRecording;
      this.record = function() {
        isRecording = true;
        if (isCanvasSupportsStreamCapturing && !config.useWhammyRecorder) {
          var canvasMediaStream;
          if ("captureStream" in globalCanvas) {
            canvasMediaStream = globalCanvas.captureStream(25);
          } else if ("mozCaptureStream" in globalCanvas) {
            canvasMediaStream = globalCanvas.mozCaptureStream(25);
          } else if ("webkitCaptureStream" in globalCanvas) {
            canvasMediaStream = globalCanvas.webkitCaptureStream(25);
          }
          try {
            var mdStream = new MediaStream();
            mdStream.addTrack(getTracks(canvasMediaStream, "video")[0]);
            canvasMediaStream = mdStream;
          } catch (e) {
          }
          if (!canvasMediaStream) {
            throw "captureStream API are NOT available.";
          }
          mediaStreamRecorder = new MediaStreamRecorder(canvasMediaStream, {
            mimeType: config.mimeType || "video/webm"
          });
          mediaStreamRecorder.record();
        } else {
          whammy.frames = [];
          lastTime2 = (/* @__PURE__ */ new Date()).getTime();
          drawCanvasFrame();
        }
        if (config.initCallback) {
          config.initCallback();
        }
      };
      this.getWebPImages = function(callback) {
        if (htmlElement.nodeName.toLowerCase() !== "canvas") {
          callback();
          return;
        }
        var framesLength = whammy.frames.length;
        whammy.frames.forEach(function(frame, idx) {
          var framesRemaining = framesLength - idx;
          if (!config.disableLogs) {
            console.log(framesRemaining + "/" + framesLength + " frames remaining");
          }
          if (config.onEncodingCallback) {
            config.onEncodingCallback(framesRemaining, framesLength);
          }
          var webp = frame.image.toDataURL("image/webp", 1);
          whammy.frames[idx].image = webp;
        });
        if (!config.disableLogs) {
          console.log("Generating WebM");
        }
        callback();
      };
      this.stop = function(callback) {
        isRecording = false;
        var that = this;
        if (isCanvasSupportsStreamCapturing && mediaStreamRecorder) {
          mediaStreamRecorder.stop(callback);
          return;
        }
        this.getWebPImages(function() {
          whammy.compile(function(blob) {
            if (!config.disableLogs) {
              console.log("Recording finished!");
            }
            that.blob = blob;
            if (that.blob.forEach) {
              that.blob = new Blob([], {
                type: "video/webm"
              });
            }
            if (callback) {
              callback(that.blob);
            }
            whammy.frames = [];
          });
        });
      };
      var isPausedRecording = false;
      this.pause = function() {
        isPausedRecording = true;
        if (mediaStreamRecorder instanceof MediaStreamRecorder) {
          mediaStreamRecorder.pause();
          return;
        }
      };
      this.resume = function() {
        isPausedRecording = false;
        if (mediaStreamRecorder instanceof MediaStreamRecorder) {
          mediaStreamRecorder.resume();
          return;
        }
        if (!isRecording) {
          this.record();
        }
      };
      this.clearRecordedData = function() {
        if (isRecording) {
          this.stop(clearRecordedDataCB);
        }
        clearRecordedDataCB();
      };
      function clearRecordedDataCB() {
        whammy.frames = [];
        isRecording = false;
        isPausedRecording = false;
      }
      this.name = "CanvasRecorder";
      this.toString = function() {
        return this.name;
      };
      function cloneCanvas() {
        var newCanvas = document.createElement("canvas");
        var context = newCanvas.getContext("2d");
        newCanvas.width = htmlElement.width;
        newCanvas.height = htmlElement.height;
        context.drawImage(htmlElement, 0, 0);
        return newCanvas;
      }
      function drawCanvasFrame() {
        if (isPausedRecording) {
          lastTime2 = (/* @__PURE__ */ new Date()).getTime();
          return setTimeout(drawCanvasFrame, 500);
        }
        if (htmlElement.nodeName.toLowerCase() === "canvas") {
          var duration = (/* @__PURE__ */ new Date()).getTime() - lastTime2;
          lastTime2 = (/* @__PURE__ */ new Date()).getTime();
          whammy.frames.push({
            image: cloneCanvas(),
            duration
          });
          if (isRecording) {
            setTimeout(drawCanvasFrame, config.frameInterval);
          }
          return;
        }
        html2canvas(htmlElement, {
          grabMouse: typeof config.showMousePointer === "undefined" || config.showMousePointer,
          onrendered: function(canvas) {
            var duration2 = (/* @__PURE__ */ new Date()).getTime() - lastTime2;
            if (!duration2) {
              return setTimeout(drawCanvasFrame, config.frameInterval);
            }
            lastTime2 = (/* @__PURE__ */ new Date()).getTime();
            whammy.frames.push({
              image: canvas.toDataURL("image/webp", 1),
              duration: duration2
            });
            if (isRecording) {
              setTimeout(drawCanvasFrame, config.frameInterval);
            }
          }
        });
      }
      var lastTime2 = (/* @__PURE__ */ new Date()).getTime();
      var whammy = new Whammy.Video(100);
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.CanvasRecorder = CanvasRecorder;
    }
    function WhammyRecorder(mediaStream, config) {
      config = config || {};
      if (!config.frameInterval) {
        config.frameInterval = 10;
      }
      if (!config.disableLogs) {
        console.log("Using frames-interval:", config.frameInterval);
      }
      this.record = function() {
        if (!config.width) {
          config.width = 320;
        }
        if (!config.height) {
          config.height = 240;
        }
        if (!config.video) {
          config.video = {
            width: config.width,
            height: config.height
          };
        }
        if (!config.canvas) {
          config.canvas = {
            width: config.width,
            height: config.height
          };
        }
        canvas.width = config.canvas.width || 320;
        canvas.height = config.canvas.height || 240;
        context = canvas.getContext("2d");
        if (config.video && config.video instanceof HTMLVideoElement) {
          video = config.video.cloneNode();
          if (config.initCallback) {
            config.initCallback();
          }
        } else {
          video = document.createElement("video");
          setSrcObject(mediaStream, video);
          video.onloadedmetadata = function() {
            if (config.initCallback) {
              config.initCallback();
            }
          };
          video.width = config.video.width;
          video.height = config.video.height;
        }
        video.muted = true;
        video.play();
        lastTime2 = (/* @__PURE__ */ new Date()).getTime();
        whammy = new Whammy.Video();
        if (!config.disableLogs) {
          console.log("canvas resolutions", canvas.width, "*", canvas.height);
          console.log("video width/height", video.width || canvas.width, "*", video.height || canvas.height);
        }
        drawFrames(config.frameInterval);
      };
      function drawFrames(frameInterval) {
        frameInterval = typeof frameInterval !== "undefined" ? frameInterval : 10;
        var duration = (/* @__PURE__ */ new Date()).getTime() - lastTime2;
        if (!duration) {
          return setTimeout(drawFrames, frameInterval, frameInterval);
        }
        if (isPausedRecording) {
          lastTime2 = (/* @__PURE__ */ new Date()).getTime();
          return setTimeout(drawFrames, 100);
        }
        lastTime2 = (/* @__PURE__ */ new Date()).getTime();
        if (video.paused) {
          video.play();
        }
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        whammy.frames.push({
          duration,
          image: canvas.toDataURL("image/webp")
        });
        if (!isStopDrawing) {
          setTimeout(drawFrames, frameInterval, frameInterval);
        }
      }
      function asyncLoop(o) {
        var i = -1, length = o.length;
        (function loop() {
          i++;
          if (i === length) {
            o.callback();
            return;
          }
          setTimeout(function() {
            o.functionToLoop(loop, i);
          }, 1);
        })();
      }
      function dropBlackFrames(_frames, _framesToCheck, _pixTolerance, _frameTolerance, callback) {
        var localCanvas = document.createElement("canvas");
        localCanvas.width = canvas.width;
        localCanvas.height = canvas.height;
        var context2d = localCanvas.getContext("2d");
        var resultFrames = [];
        var checkUntilNotBlack = _framesToCheck === -1;
        var endCheckFrame = _framesToCheck && _framesToCheck > 0 && _framesToCheck <= _frames.length ? _framesToCheck : _frames.length;
        var sampleColor = {
          r: 0,
          g: 0,
          b: 0
        };
        var maxColorDifference = Math.sqrt(
          Math.pow(255, 2) + Math.pow(255, 2) + Math.pow(255, 2)
        );
        var pixTolerance = _pixTolerance && _pixTolerance >= 0 && _pixTolerance <= 1 ? _pixTolerance : 0;
        var frameTolerance = _frameTolerance && _frameTolerance >= 0 && _frameTolerance <= 1 ? _frameTolerance : 0;
        var doNotCheckNext = false;
        asyncLoop({
          length: endCheckFrame,
          functionToLoop: function(loop, f) {
            var matchPixCount, endPixCheck, maxPixCount;
            var finishImage = function() {
              if (!doNotCheckNext && maxPixCount - matchPixCount <= maxPixCount * frameTolerance) {
              } else {
                if (checkUntilNotBlack) {
                  doNotCheckNext = true;
                }
                resultFrames.push(_frames[f]);
              }
              loop();
            };
            if (!doNotCheckNext) {
              var image = new Image();
              image.onload = function() {
                context2d.drawImage(image, 0, 0, canvas.width, canvas.height);
                var imageData = context2d.getImageData(0, 0, canvas.width, canvas.height);
                matchPixCount = 0;
                endPixCheck = imageData.data.length;
                maxPixCount = imageData.data.length / 4;
                for (var pix = 0; pix < endPixCheck; pix += 4) {
                  var currentColor = {
                    r: imageData.data[pix],
                    g: imageData.data[pix + 1],
                    b: imageData.data[pix + 2]
                  };
                  var colorDifference = Math.sqrt(
                    Math.pow(currentColor.r - sampleColor.r, 2) + Math.pow(currentColor.g - sampleColor.g, 2) + Math.pow(currentColor.b - sampleColor.b, 2)
                  );
                  if (colorDifference <= maxColorDifference * pixTolerance) {
                    matchPixCount++;
                  }
                }
                finishImage();
              };
              image.src = _frames[f].image;
            } else {
              finishImage();
            }
          },
          callback: function() {
            resultFrames = resultFrames.concat(_frames.slice(endCheckFrame));
            if (resultFrames.length <= 0) {
              resultFrames.push(_frames[_frames.length - 1]);
            }
            callback(resultFrames);
          }
        });
      }
      var isStopDrawing = false;
      this.stop = function(callback) {
        callback = callback || function() {
        };
        isStopDrawing = true;
        var _this = this;
        setTimeout(function() {
          dropBlackFrames(whammy.frames, -1, null, null, function(frames) {
            whammy.frames = frames;
            if (config.advertisement && config.advertisement.length) {
              whammy.frames = config.advertisement.concat(whammy.frames);
            }
            whammy.compile(function(blob) {
              _this.blob = blob;
              if (_this.blob.forEach) {
                _this.blob = new Blob([], {
                  type: "video/webm"
                });
              }
              if (callback) {
                callback(_this.blob);
              }
            });
          });
        }, 10);
      };
      var isPausedRecording = false;
      this.pause = function() {
        isPausedRecording = true;
      };
      this.resume = function() {
        isPausedRecording = false;
        if (isStopDrawing) {
          this.record();
        }
      };
      this.clearRecordedData = function() {
        if (!isStopDrawing) {
          this.stop(clearRecordedDataCB);
        }
        clearRecordedDataCB();
      };
      function clearRecordedDataCB() {
        whammy.frames = [];
        isStopDrawing = true;
        isPausedRecording = false;
      }
      this.name = "WhammyRecorder";
      this.toString = function() {
        return this.name;
      };
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      var video;
      var lastTime2;
      var whammy;
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.WhammyRecorder = WhammyRecorder;
    }
    var Whammy = function() {
      function WhammyVideo(duration) {
        this.frames = [];
        this.duration = duration || 1;
        this.quality = 0.8;
      }
      WhammyVideo.prototype.add = function(frame, duration) {
        if ("canvas" in frame) {
          frame = frame.canvas;
        }
        if ("toDataURL" in frame) {
          frame = frame.toDataURL("image/webp", this.quality);
        }
        if (!/^data:image\/webp;base64,/ig.test(frame)) {
          throw "Input must be formatted properly as a base64 encoded DataURI of type image/webp";
        }
        this.frames.push({
          image: frame,
          duration: duration || this.duration
        });
      };
      function processInWebWorker(_function) {
        var blob = URL.createObjectURL(new Blob([
          _function.toString(),
          "this.onmessage =  function (eee) {" + _function.name + "(eee.data);}"
        ], {
          type: "application/javascript"
        }));
        var worker = new Worker(blob);
        URL.revokeObjectURL(blob);
        return worker;
      }
      function whammyInWebWorker(frames) {
        function ArrayToWebM(frames2) {
          var info = checkFrames(frames2);
          if (!info) {
            return [];
          }
          var clusterMaxDuration = 3e4;
          var EBML2 = [{
            "id": 440786851,
            // EBML
            "data": [{
              "data": 1,
              "id": 17030
              // EBMLVersion
            }, {
              "data": 1,
              "id": 17143
              // EBMLReadVersion
            }, {
              "data": 4,
              "id": 17138
              // EBMLMaxIDLength
            }, {
              "data": 8,
              "id": 17139
              // EBMLMaxSizeLength
            }, {
              "data": "webm",
              "id": 17026
              // DocType
            }, {
              "data": 2,
              "id": 17031
              // DocTypeVersion
            }, {
              "data": 2,
              "id": 17029
              // DocTypeReadVersion
            }]
          }, {
            "id": 408125543,
            // Segment
            "data": [{
              "id": 357149030,
              // Info
              "data": [{
                "data": 1e6,
                //do things in millisecs (num of nanosecs for duration scale)
                "id": 2807729
                // TimecodeScale
              }, {
                "data": "whammy",
                "id": 19840
                // MuxingApp
              }, {
                "data": "whammy",
                "id": 22337
                // WritingApp
              }, {
                "data": doubleToString(info.duration),
                "id": 17545
                // Duration
              }]
            }, {
              "id": 374648427,
              // Tracks
              "data": [{
                "id": 174,
                // TrackEntry
                "data": [{
                  "data": 1,
                  "id": 215
                  // TrackNumber
                }, {
                  "data": 1,
                  "id": 29637
                  // TrackUID
                }, {
                  "data": 0,
                  "id": 156
                  // FlagLacing
                }, {
                  "data": "und",
                  "id": 2274716
                  // Language
                }, {
                  "data": "V_VP8",
                  "id": 134
                  // CodecID
                }, {
                  "data": "VP8",
                  "id": 2459272
                  // CodecName
                }, {
                  "data": 1,
                  "id": 131
                  // TrackType
                }, {
                  "id": 224,
                  // Video
                  "data": [{
                    "data": info.width,
                    "id": 176
                    // PixelWidth
                  }, {
                    "data": info.height,
                    "id": 186
                    // PixelHeight
                  }]
                }]
              }]
            }]
          }];
          var frameNumber = 0;
          var clusterTimecode = 0;
          while (frameNumber < frames2.length) {
            var clusterFrames = [];
            var clusterDuration = 0;
            do {
              clusterFrames.push(frames2[frameNumber]);
              clusterDuration += frames2[frameNumber].duration;
              frameNumber++;
            } while (frameNumber < frames2.length && clusterDuration < clusterMaxDuration);
            var clusterCounter = 0;
            var cluster = {
              "id": 524531317,
              // Cluster
              "data": getClusterData(clusterTimecode, clusterCounter, clusterFrames)
            };
            EBML2[1].data.push(cluster);
            clusterTimecode += clusterDuration;
          }
          return generateEBML(EBML2);
        }
        function getClusterData(clusterTimecode, clusterCounter, clusterFrames) {
          return [{
            "data": clusterTimecode,
            "id": 231
            // Timecode
          }].concat(clusterFrames.map(function(webp) {
            var block = makeSimpleBlock({
              discardable: 0,
              frame: webp.data.slice(4),
              invisible: 0,
              keyframe: 1,
              lacing: 0,
              trackNum: 1,
              timecode: Math.round(clusterCounter)
            });
            clusterCounter += webp.duration;
            return {
              data: block,
              id: 163
            };
          }));
        }
        function checkFrames(frames2) {
          if (!frames2[0]) {
            postMessage({
              error: "Something went wrong. Maybe WebP format is not supported in the current browser."
            });
            return;
          }
          var width = frames2[0].width, height = frames2[0].height, duration = frames2[0].duration;
          for (var i = 1; i < frames2.length; i++) {
            duration += frames2[i].duration;
          }
          return {
            duration,
            width,
            height
          };
        }
        function numToBuffer(num) {
          var parts = [];
          while (num > 0) {
            parts.push(num & 255);
            num = num >> 8;
          }
          return new Uint8Array(parts.reverse());
        }
        function strToBuffer(str) {
          return new Uint8Array(str.split("").map(function(e) {
            return e.charCodeAt(0);
          }));
        }
        function bitsToBuffer(bits) {
          var data = [];
          var pad = bits.length % 8 ? new Array(1 + 8 - bits.length % 8).join("0") : "";
          bits = pad + bits;
          for (var i = 0; i < bits.length; i += 8) {
            data.push(parseInt(bits.substr(i, 8), 2));
          }
          return new Uint8Array(data);
        }
        function generateEBML(json) {
          var ebml = [];
          for (var i = 0; i < json.length; i++) {
            var data = json[i].data;
            if (typeof data === "object") {
              data = generateEBML(data);
            }
            if (typeof data === "number") {
              data = bitsToBuffer(data.toString(2));
            }
            if (typeof data === "string") {
              data = strToBuffer(data);
            }
            var len = data.size || data.byteLength || data.length;
            var zeroes = Math.ceil(Math.ceil(Math.log(len) / Math.log(2)) / 8);
            var sizeToString = len.toString(2);
            var padded = new Array(zeroes * 7 + 7 + 1 - sizeToString.length).join("0") + sizeToString;
            var size = new Array(zeroes).join("0") + "1" + padded;
            ebml.push(numToBuffer(json[i].id));
            ebml.push(bitsToBuffer(size));
            ebml.push(data);
          }
          return new Blob(ebml, {
            type: "video/webm"
          });
        }
        function toBinStrOld(bits) {
          var data = "";
          var pad = bits.length % 8 ? new Array(1 + 8 - bits.length % 8).join("0") : "";
          bits = pad + bits;
          for (var i = 0; i < bits.length; i += 8) {
            data += String.fromCharCode(parseInt(bits.substr(i, 8), 2));
          }
          return data;
        }
        function makeSimpleBlock(data) {
          var flags = 0;
          if (data.keyframe) {
            flags |= 128;
          }
          if (data.invisible) {
            flags |= 8;
          }
          if (data.lacing) {
            flags |= data.lacing << 1;
          }
          if (data.discardable) {
            flags |= 1;
          }
          if (data.trackNum > 127) {
            throw "TrackNumber > 127 not supported";
          }
          var out = [data.trackNum | 128, data.timecode >> 8, data.timecode & 255, flags].map(function(e) {
            return String.fromCharCode(e);
          }).join("") + data.frame;
          return out;
        }
        function parseWebP(riff) {
          var VP8 = riff.RIFF[0].WEBP[0];
          var frameStart = VP8.indexOf("*");
          for (var i = 0, c = []; i < 4; i++) {
            c[i] = VP8.charCodeAt(frameStart + 3 + i);
          }
          var width, height, tmp;
          tmp = c[1] << 8 | c[0];
          width = tmp & 16383;
          tmp = c[3] << 8 | c[2];
          height = tmp & 16383;
          return {
            width,
            height,
            data: VP8,
            riff
          };
        }
        function getStrLength(string, offset) {
          return parseInt(string.substr(offset + 4, 4).split("").map(function(i) {
            var unpadded = i.charCodeAt(0).toString(2);
            return new Array(8 - unpadded.length + 1).join("0") + unpadded;
          }).join(""), 2);
        }
        function parseRIFF(string) {
          var offset = 0;
          var chunks = {};
          while (offset < string.length) {
            var id = string.substr(offset, 4);
            var len = getStrLength(string, offset);
            var data = string.substr(offset + 4 + 4, len);
            offset += 4 + 4 + len;
            chunks[id] = chunks[id] || [];
            if (id === "RIFF" || id === "LIST") {
              chunks[id].push(parseRIFF(data));
            } else {
              chunks[id].push(data);
            }
          }
          return chunks;
        }
        function doubleToString(num) {
          return [].slice.call(
            new Uint8Array(new Float64Array([num]).buffer),
            0
          ).map(function(e) {
            return String.fromCharCode(e);
          }).reverse().join("");
        }
        var webm = new ArrayToWebM(frames.map(function(frame) {
          var webp = parseWebP(parseRIFF(atob(frame.image.slice(23))));
          webp.duration = frame.duration;
          return webp;
        }));
        postMessage(webm);
      }
      WhammyVideo.prototype.compile = function(callback) {
        var webWorker = processInWebWorker(whammyInWebWorker);
        webWorker.onmessage = function(event) {
          if (event.data.error) {
            console.error(event.data.error);
            return;
          }
          callback(event.data);
        };
        webWorker.postMessage(this.frames);
      };
      return {
        /**
         * A more abstract-ish API.
         * @method
         * @memberof Whammy
         * @example
         * recorder = new Whammy().Video(0.8, 100);
         * @param {?number} speed - 0.8
         * @param {?number} quality - 100
         */
        Video: WhammyVideo
      };
    }();
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.Whammy = Whammy;
    }
    var DiskStorage = {
      /**
       * This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
       * @method
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.init();
       */
      init: function() {
        var self = this;
        if (typeof indexedDB === "undefined" || typeof indexedDB.open === "undefined") {
          console.error("IndexedDB API are not available in this browser.");
          return;
        }
        var dbVersion = 1;
        var dbName = this.dbName || location.href.replace(/\/|:|#|%|\.|\[|\]/g, ""), db;
        var request = indexedDB.open(dbName, dbVersion);
        function createObjectStore(dataBase) {
          dataBase.createObjectStore(self.dataStoreName);
        }
        function putInDB() {
          var transaction = db.transaction([self.dataStoreName], "readwrite");
          if (self.videoBlob) {
            transaction.objectStore(self.dataStoreName).put(self.videoBlob, "videoBlob");
          }
          if (self.gifBlob) {
            transaction.objectStore(self.dataStoreName).put(self.gifBlob, "gifBlob");
          }
          if (self.audioBlob) {
            transaction.objectStore(self.dataStoreName).put(self.audioBlob, "audioBlob");
          }
          function getFromStore(portionName) {
            transaction.objectStore(self.dataStoreName).get(portionName).onsuccess = function(event) {
              if (self.callback) {
                self.callback(event.target.result, portionName);
              }
            };
          }
          getFromStore("audioBlob");
          getFromStore("videoBlob");
          getFromStore("gifBlob");
        }
        request.onerror = self.onError;
        request.onsuccess = function() {
          db = request.result;
          db.onerror = self.onError;
          if (db.setVersion) {
            if (db.version !== dbVersion) {
              var setVersion = db.setVersion(dbVersion);
              setVersion.onsuccess = function() {
                createObjectStore(db);
                putInDB();
              };
            } else {
              putInDB();
            }
          } else {
            putInDB();
          }
        };
        request.onupgradeneeded = function(event) {
          createObjectStore(event.target.result);
        };
      },
      /**
       * This method fetches stored blobs from IndexedDB.
       * @method
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.Fetch(function(dataURL, type) {
       *     if(type === 'audioBlob') { }
       *     if(type === 'videoBlob') { }
       *     if(type === 'gifBlob')   { }
       * });
       */
      Fetch: function(callback) {
        this.callback = callback;
        this.init();
        return this;
      },
      /**
       * This method stores blobs in IndexedDB.
       * @method
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.Store({
       *     audioBlob: yourAudioBlob,
       *     videoBlob: yourVideoBlob,
       *     gifBlob  : yourGifBlob
       * });
       */
      Store: function(config) {
        this.audioBlob = config.audioBlob;
        this.videoBlob = config.videoBlob;
        this.gifBlob = config.gifBlob;
        this.init();
        return this;
      },
      /**
       * This function is invoked for any known/unknown error.
       * @method
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.onError = function(error){
       *     alerot( JSON.stringify(error) );
       * };
       */
      onError: function(error) {
        console.error(JSON.stringify(error, null, "	"));
      },
      /**
       * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
       * @memberof DiskStorage
       * @internal
       * @example
       * DiskStorage.dataStoreName = 'recordRTC';
       */
      dataStoreName: "recordRTC",
      dbName: null
    };
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.DiskStorage = DiskStorage;
    }
    function GifRecorder(mediaStream, config) {
      if (typeof GIFEncoder === "undefined") {
        var script = document.createElement("script");
        script.src = "https://www.webrtc-experiment.com/gif-recorder.js";
        (document.body || document.documentElement).appendChild(script);
      }
      config = config || {};
      var isHTMLObject = mediaStream instanceof CanvasRenderingContext2D || mediaStream instanceof HTMLCanvasElement;
      this.record = function() {
        if (typeof GIFEncoder === "undefined") {
          setTimeout(self.record, 1e3);
          return;
        }
        if (!isLoadedMetaData) {
          setTimeout(self.record, 1e3);
          return;
        }
        if (!isHTMLObject) {
          if (!config.width) {
            config.width = video.offsetWidth || 320;
          }
          if (!config.height) {
            config.height = video.offsetHeight || 240;
          }
          if (!config.video) {
            config.video = {
              width: config.width,
              height: config.height
            };
          }
          if (!config.canvas) {
            config.canvas = {
              width: config.width,
              height: config.height
            };
          }
          canvas.width = config.canvas.width || 320;
          canvas.height = config.canvas.height || 240;
          video.width = config.video.width || 320;
          video.height = config.video.height || 240;
        }
        gifEncoder = new GIFEncoder();
        gifEncoder.setRepeat(0);
        gifEncoder.setDelay(config.frameRate || 200);
        gifEncoder.setQuality(config.quality || 10);
        gifEncoder.start();
        if (typeof config.onGifRecordingStarted === "function") {
          config.onGifRecordingStarted();
        }
        startTime = Date.now();
        function drawVideoFrame(time) {
          if (self.clearedRecordedData === true) {
            return;
          }
          if (isPausedRecording) {
            return setTimeout(function() {
              drawVideoFrame(time);
            }, 100);
          }
          lastAnimationFrame = requestAnimationFrame(drawVideoFrame);
          if (typeof lastFrameTime === void 0) {
            lastFrameTime = time;
          }
          if (time - lastFrameTime < 90) {
            return;
          }
          if (!isHTMLObject && video.paused) {
            video.play();
          }
          if (!isHTMLObject) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
          }
          if (config.onGifPreview) {
            config.onGifPreview(canvas.toDataURL("image/png"));
          }
          gifEncoder.addFrame(context);
          lastFrameTime = time;
        }
        lastAnimationFrame = requestAnimationFrame(drawVideoFrame);
        if (config.initCallback) {
          config.initCallback();
        }
      };
      this.stop = function(callback) {
        callback = callback || function() {
        };
        if (lastAnimationFrame) {
          cancelAnimationFrame(lastAnimationFrame);
        }
        endTime = Date.now();
        this.blob = new Blob([new Uint8Array(gifEncoder.stream().bin)], {
          type: "image/gif"
        });
        callback(this.blob);
        gifEncoder.stream().bin = [];
      };
      var isPausedRecording = false;
      this.pause = function() {
        isPausedRecording = true;
      };
      this.resume = function() {
        isPausedRecording = false;
      };
      this.clearRecordedData = function() {
        self.clearedRecordedData = true;
        clearRecordedDataCB();
      };
      function clearRecordedDataCB() {
        if (gifEncoder) {
          gifEncoder.stream().bin = [];
        }
      }
      this.name = "GifRecorder";
      this.toString = function() {
        return this.name;
      };
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      if (isHTMLObject) {
        if (mediaStream instanceof CanvasRenderingContext2D) {
          context = mediaStream;
          canvas = context.canvas;
        } else if (mediaStream instanceof HTMLCanvasElement) {
          context = mediaStream.getContext("2d");
          canvas = mediaStream;
        }
      }
      var isLoadedMetaData = true;
      if (!isHTMLObject) {
        var video = document.createElement("video");
        video.muted = true;
        video.autoplay = true;
        video.playsInline = true;
        isLoadedMetaData = false;
        video.onloadedmetadata = function() {
          isLoadedMetaData = true;
        };
        setSrcObject(mediaStream, video);
        video.play();
      }
      var lastAnimationFrame = null;
      var startTime, endTime, lastFrameTime;
      var gifEncoder;
      var self = this;
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.GifRecorder = GifRecorder;
    }
    function MultiStreamsMixer(arrayOfMediaStreams, elementClass) {
      var browserFakeUserAgent2 = "Fake/5.0 (FakeOS) AppleWebKit/123 (KHTML, like Gecko) Fake/12.3.4567.89 Fake/123.45";
      (function(that) {
        if (typeof RecordRTC !== "undefined") {
          return;
        }
        if (!that) {
          return;
        }
        if (typeof window !== "undefined") {
          return;
        }
        if (typeof global === "undefined") {
          return;
        }
        global.navigator = {
          userAgent: browserFakeUserAgent2,
          getUserMedia: function() {
          }
        };
        if (!global.console) {
          global.console = {};
        }
        if (typeof global.console.log === "undefined" || typeof global.console.error === "undefined") {
          global.console.error = global.console.log = global.console.log || function() {
            console.log(arguments);
          };
        }
        if (typeof document === "undefined") {
          that.document = {
            documentElement: {
              appendChild: function() {
                return "";
              }
            }
          };
          document.createElement = document.captureStream = document.mozCaptureStream = function() {
            var obj = {
              getContext: function() {
                return obj;
              },
              play: function() {
              },
              pause: function() {
              },
              drawImage: function() {
              },
              toDataURL: function() {
                return "";
              },
              style: {}
            };
            return obj;
          };
          that.HTMLVideoElement = function() {
          };
        }
        if (typeof location === "undefined") {
          that.location = {
            protocol: "file:",
            href: "",
            hash: ""
          };
        }
        if (typeof screen === "undefined") {
          that.screen = {
            width: 0,
            height: 0
          };
        }
        if (typeof URL2 === "undefined") {
          that.URL = {
            createObjectURL: function() {
              return "";
            },
            revokeObjectURL: function() {
              return "";
            }
          };
        }
        that.window = global;
      })(typeof global !== "undefined" ? global : null);
      elementClass = elementClass || "multi-streams-mixer";
      var videos = [];
      var isStopDrawingFrames = false;
      var canvas = document.createElement("canvas");
      var context = canvas.getContext("2d");
      canvas.style.opacity = 0;
      canvas.style.position = "absolute";
      canvas.style.zIndex = -1;
      canvas.style.top = "-1000em";
      canvas.style.left = "-1000em";
      canvas.className = elementClass;
      (document.body || document.documentElement).appendChild(canvas);
      this.disableLogs = false;
      this.frameInterval = 10;
      this.width = 360;
      this.height = 240;
      this.useGainNode = true;
      var self = this;
      var AudioContext2 = window.AudioContext;
      if (typeof AudioContext2 === "undefined") {
        if (typeof webkitAudioContext !== "undefined") {
          AudioContext2 = webkitAudioContext;
        }
        if (typeof mozAudioContext !== "undefined") {
          AudioContext2 = mozAudioContext;
        }
      }
      var URL2 = window.URL;
      if (typeof URL2 === "undefined" && typeof webkitURL !== "undefined") {
        URL2 = webkitURL;
      }
      if (typeof navigator !== "undefined" && typeof navigator.getUserMedia === "undefined") {
        if (typeof navigator.webkitGetUserMedia !== "undefined") {
          navigator.getUserMedia = navigator.webkitGetUserMedia;
        }
        if (typeof navigator.mozGetUserMedia !== "undefined") {
          navigator.getUserMedia = navigator.mozGetUserMedia;
        }
      }
      var MediaStream2 = window.MediaStream;
      if (typeof MediaStream2 === "undefined" && typeof webkitMediaStream !== "undefined") {
        MediaStream2 = webkitMediaStream;
      }
      if (typeof MediaStream2 !== "undefined") {
        if (typeof MediaStream2.prototype.stop === "undefined") {
          MediaStream2.prototype.stop = function() {
            this.getTracks().forEach(function(track) {
              track.stop();
            });
          };
        }
      }
      var Storage2 = {};
      if (typeof AudioContext2 !== "undefined") {
        Storage2.AudioContext = AudioContext2;
      } else if (typeof webkitAudioContext !== "undefined") {
        Storage2.AudioContext = webkitAudioContext;
      }
      function setSrcObject2(stream, element) {
        if ("srcObject" in element) {
          element.srcObject = stream;
        } else if ("mozSrcObject" in element) {
          element.mozSrcObject = stream;
        } else {
          element.srcObject = stream;
        }
      }
      this.startDrawingFrames = function() {
        drawVideosToCanvas();
      };
      function drawVideosToCanvas() {
        if (isStopDrawingFrames) {
          return;
        }
        var videosLength = videos.length;
        var fullcanvas = false;
        var remaining = [];
        videos.forEach(function(video) {
          if (!video.stream) {
            video.stream = {};
          }
          if (video.stream.fullcanvas) {
            fullcanvas = video;
          } else {
            remaining.push(video);
          }
        });
        if (fullcanvas) {
          canvas.width = fullcanvas.stream.width;
          canvas.height = fullcanvas.stream.height;
        } else if (remaining.length) {
          canvas.width = videosLength > 1 ? remaining[0].width * 2 : remaining[0].width;
          var height = 1;
          if (videosLength === 3 || videosLength === 4) {
            height = 2;
          }
          if (videosLength === 5 || videosLength === 6) {
            height = 3;
          }
          if (videosLength === 7 || videosLength === 8) {
            height = 4;
          }
          if (videosLength === 9 || videosLength === 10) {
            height = 5;
          }
          canvas.height = remaining[0].height * height;
        } else {
          canvas.width = self.width || 360;
          canvas.height = self.height || 240;
        }
        if (fullcanvas && fullcanvas instanceof HTMLVideoElement) {
          drawImage(fullcanvas);
        }
        remaining.forEach(function(video, idx) {
          drawImage(video, idx);
        });
        setTimeout(drawVideosToCanvas, self.frameInterval);
      }
      function drawImage(video, idx) {
        if (isStopDrawingFrames) {
          return;
        }
        var x = 0;
        var y = 0;
        var width = video.width;
        var height = video.height;
        if (idx === 1) {
          x = video.width;
        }
        if (idx === 2) {
          y = video.height;
        }
        if (idx === 3) {
          x = video.width;
          y = video.height;
        }
        if (idx === 4) {
          y = video.height * 2;
        }
        if (idx === 5) {
          x = video.width;
          y = video.height * 2;
        }
        if (idx === 6) {
          y = video.height * 3;
        }
        if (idx === 7) {
          x = video.width;
          y = video.height * 3;
        }
        if (typeof video.stream.left !== "undefined") {
          x = video.stream.left;
        }
        if (typeof video.stream.top !== "undefined") {
          y = video.stream.top;
        }
        if (typeof video.stream.width !== "undefined") {
          width = video.stream.width;
        }
        if (typeof video.stream.height !== "undefined") {
          height = video.stream.height;
        }
        context.drawImage(video, x, y, width, height);
        if (typeof video.stream.onRender === "function") {
          video.stream.onRender(context, x, y, width, height, idx);
        }
      }
      function getMixedStream() {
        isStopDrawingFrames = false;
        var mixedVideoStream = getMixedVideoStream();
        var mixedAudioStream = getMixedAudioStream();
        if (mixedAudioStream) {
          mixedAudioStream.getTracks().filter(function(t) {
            return t.kind === "audio";
          }).forEach(function(track) {
            mixedVideoStream.addTrack(track);
          });
        }
        var fullcanvas;
        arrayOfMediaStreams.forEach(function(stream) {
          if (stream.fullcanvas) {
            fullcanvas = true;
          }
        });
        return mixedVideoStream;
      }
      function getMixedVideoStream() {
        resetVideoStreams();
        var capturedStream;
        if ("captureStream" in canvas) {
          capturedStream = canvas.captureStream();
        } else if ("mozCaptureStream" in canvas) {
          capturedStream = canvas.mozCaptureStream();
        } else if (!self.disableLogs) {
          console.error("Upgrade to latest Chrome or otherwise enable this flag: chrome://flags/#enable-experimental-web-platform-features");
        }
        var videoStream = new MediaStream2();
        capturedStream.getTracks().filter(function(t) {
          return t.kind === "video";
        }).forEach(function(track) {
          videoStream.addTrack(track);
        });
        canvas.stream = videoStream;
        return videoStream;
      }
      function getMixedAudioStream() {
        if (!Storage2.AudioContextConstructor) {
          Storage2.AudioContextConstructor = new Storage2.AudioContext();
        }
        self.audioContext = Storage2.AudioContextConstructor;
        self.audioSources = [];
        if (self.useGainNode === true) {
          self.gainNode = self.audioContext.createGain();
          self.gainNode.connect(self.audioContext.destination);
          self.gainNode.gain.value = 0;
        }
        var audioTracksLength = 0;
        arrayOfMediaStreams.forEach(function(stream) {
          if (!stream.getTracks().filter(function(t) {
            return t.kind === "audio";
          }).length) {
            return;
          }
          audioTracksLength++;
          var audioSource = self.audioContext.createMediaStreamSource(stream);
          if (self.useGainNode === true) {
            audioSource.connect(self.gainNode);
          }
          self.audioSources.push(audioSource);
        });
        if (!audioTracksLength) {
          return;
        }
        self.audioDestination = self.audioContext.createMediaStreamDestination();
        self.audioSources.forEach(function(audioSource) {
          audioSource.connect(self.audioDestination);
        });
        return self.audioDestination.stream;
      }
      function getVideo(stream) {
        var video = document.createElement("video");
        setSrcObject2(stream, video);
        video.className = elementClass;
        video.muted = true;
        video.volume = 0;
        video.width = stream.width || self.width || 360;
        video.height = stream.height || self.height || 240;
        video.play();
        return video;
      }
      this.appendStreams = function(streams) {
        if (!streams) {
          throw "First parameter is required.";
        }
        if (!(streams instanceof Array)) {
          streams = [streams];
        }
        streams.forEach(function(stream) {
          var newStream = new MediaStream2();
          if (stream.getTracks().filter(function(t) {
            return t.kind === "video";
          }).length) {
            var video = getVideo(stream);
            video.stream = stream;
            videos.push(video);
            newStream.addTrack(stream.getTracks().filter(function(t) {
              return t.kind === "video";
            })[0]);
          }
          if (stream.getTracks().filter(function(t) {
            return t.kind === "audio";
          }).length) {
            var audioSource = self.audioContext.createMediaStreamSource(stream);
            self.audioDestination = self.audioContext.createMediaStreamDestination();
            audioSource.connect(self.audioDestination);
            newStream.addTrack(self.audioDestination.stream.getTracks().filter(function(t) {
              return t.kind === "audio";
            })[0]);
          }
          arrayOfMediaStreams.push(newStream);
        });
      };
      this.releaseStreams = function() {
        videos = [];
        isStopDrawingFrames = true;
        if (self.gainNode) {
          self.gainNode.disconnect();
          self.gainNode = null;
        }
        if (self.audioSources.length) {
          self.audioSources.forEach(function(source) {
            source.disconnect();
          });
          self.audioSources = [];
        }
        if (self.audioDestination) {
          self.audioDestination.disconnect();
          self.audioDestination = null;
        }
        if (self.audioContext) {
          self.audioContext.close();
        }
        self.audioContext = null;
        context.clearRect(0, 0, canvas.width, canvas.height);
        if (canvas.stream) {
          canvas.stream.stop();
          canvas.stream = null;
        }
      };
      this.resetVideoStreams = function(streams) {
        if (streams && !(streams instanceof Array)) {
          streams = [streams];
        }
        resetVideoStreams(streams);
      };
      function resetVideoStreams(streams) {
        videos = [];
        streams = streams || arrayOfMediaStreams;
        streams.forEach(function(stream) {
          if (!stream.getTracks().filter(function(t) {
            return t.kind === "video";
          }).length) {
            return;
          }
          var video = getVideo(stream);
          video.stream = stream;
          videos.push(video);
        });
      }
      this.name = "MultiStreamsMixer";
      this.toString = function() {
        return this.name;
      };
      this.getMixedStream = getMixedStream;
    }
    if (typeof RecordRTC === "undefined") {
      if (typeof module !== "undefined") {
        module.exports = MultiStreamsMixer;
      }
      if (typeof define === "function" && define.amd) {
        define("MultiStreamsMixer", [], function() {
          return MultiStreamsMixer;
        });
      }
    }
    function MultiStreamRecorder(arrayOfMediaStreams, options) {
      arrayOfMediaStreams = arrayOfMediaStreams || [];
      var self = this;
      var mixer;
      var mediaRecorder;
      options = options || {
        elementClass: "multi-streams-mixer",
        mimeType: "video/webm",
        video: {
          width: 360,
          height: 240
        }
      };
      if (!options.frameInterval) {
        options.frameInterval = 10;
      }
      if (!options.video) {
        options.video = {};
      }
      if (!options.video.width) {
        options.video.width = 360;
      }
      if (!options.video.height) {
        options.video.height = 240;
      }
      this.record = function() {
        mixer = new MultiStreamsMixer(arrayOfMediaStreams, options.elementClass || "multi-streams-mixer");
        if (getAllVideoTracks().length) {
          mixer.frameInterval = options.frameInterval || 10;
          mixer.width = options.video.width || 360;
          mixer.height = options.video.height || 240;
          mixer.startDrawingFrames();
        }
        if (options.previewStream && typeof options.previewStream === "function") {
          options.previewStream(mixer.getMixedStream());
        }
        mediaRecorder = new MediaStreamRecorder(mixer.getMixedStream(), options);
        mediaRecorder.record();
      };
      function getAllVideoTracks() {
        var tracks = [];
        arrayOfMediaStreams.forEach(function(stream) {
          getTracks(stream, "video").forEach(function(track) {
            tracks.push(track);
          });
        });
        return tracks;
      }
      this.stop = function(callback) {
        if (!mediaRecorder) {
          return;
        }
        mediaRecorder.stop(function(blob) {
          self.blob = blob;
          callback(blob);
          self.clearRecordedData();
        });
      };
      this.pause = function() {
        if (mediaRecorder) {
          mediaRecorder.pause();
        }
      };
      this.resume = function() {
        if (mediaRecorder) {
          mediaRecorder.resume();
        }
      };
      this.clearRecordedData = function() {
        if (mediaRecorder) {
          mediaRecorder.clearRecordedData();
          mediaRecorder = null;
        }
        if (mixer) {
          mixer.releaseStreams();
          mixer = null;
        }
      };
      this.addStreams = function(streams) {
        if (!streams) {
          throw "First parameter is required.";
        }
        if (!(streams instanceof Array)) {
          streams = [streams];
        }
        arrayOfMediaStreams.concat(streams);
        if (!mediaRecorder || !mixer) {
          return;
        }
        mixer.appendStreams(streams);
        if (options.previewStream && typeof options.previewStream === "function") {
          options.previewStream(mixer.getMixedStream());
        }
      };
      this.resetVideoStreams = function(streams) {
        if (!mixer) {
          return;
        }
        if (streams && !(streams instanceof Array)) {
          streams = [streams];
        }
        mixer.resetVideoStreams(streams);
      };
      this.getMixer = function() {
        return mixer;
      };
      this.name = "MultiStreamRecorder";
      this.toString = function() {
        return this.name;
      };
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.MultiStreamRecorder = MultiStreamRecorder;
    }
    function RecordRTCPromisesHandler(mediaStream, options) {
      if (!this) {
        throw 'Use "new RecordRTCPromisesHandler()"';
      }
      if (typeof mediaStream === "undefined") {
        throw 'First argument "MediaStream" is required.';
      }
      var self = this;
      self.recordRTC = new RecordRTC(mediaStream, options);
      this.startRecording = function() {
        return new Promise(function(resolve, reject) {
          try {
            self.recordRTC.startRecording();
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      this.stopRecording = function() {
        return new Promise(function(resolve, reject) {
          try {
            self.recordRTC.stopRecording(function(url) {
              self.blob = self.recordRTC.getBlob();
              if (!self.blob || !self.blob.size) {
                reject("Empty blob.", self.blob);
                return;
              }
              resolve(url);
            });
          } catch (e) {
            reject(e);
          }
        });
      };
      this.pauseRecording = function() {
        return new Promise(function(resolve, reject) {
          try {
            self.recordRTC.pauseRecording();
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      this.resumeRecording = function() {
        return new Promise(function(resolve, reject) {
          try {
            self.recordRTC.resumeRecording();
            resolve();
          } catch (e) {
            reject(e);
          }
        });
      };
      this.getDataURL = function(callback) {
        return new Promise(function(resolve, reject) {
          try {
            self.recordRTC.getDataURL(function(dataURL) {
              resolve(dataURL);
            });
          } catch (e) {
            reject(e);
          }
        });
      };
      this.getBlob = function() {
        return new Promise(function(resolve, reject) {
          try {
            resolve(self.recordRTC.getBlob());
          } catch (e) {
            reject(e);
          }
        });
      };
      this.getInternalRecorder = function() {
        return new Promise(function(resolve, reject) {
          try {
            resolve(self.recordRTC.getInternalRecorder());
          } catch (e) {
            reject(e);
          }
        });
      };
      this.reset = function() {
        return new Promise(function(resolve, reject) {
          try {
            resolve(self.recordRTC.reset());
          } catch (e) {
            reject(e);
          }
        });
      };
      this.destroy = function() {
        return new Promise(function(resolve, reject) {
          try {
            resolve(self.recordRTC.destroy());
          } catch (e) {
            reject(e);
          }
        });
      };
      this.getState = function() {
        return new Promise(function(resolve, reject) {
          try {
            resolve(self.recordRTC.getState());
          } catch (e) {
            reject(e);
          }
        });
      };
      this.blob = null;
      this.version = "5.6.2";
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.RecordRTCPromisesHandler = RecordRTCPromisesHandler;
    }
    function WebAssemblyRecorder(stream, config) {
      if (typeof ReadableStream === "undefined" || typeof WritableStream === "undefined") {
        console.error("Following polyfill is strongly recommended: https://unpkg.com/@mattiasbuelens/web-streams-polyfill/dist/polyfill.min.js");
      }
      config = config || {};
      config.width = config.width || 640;
      config.height = config.height || 480;
      config.frameRate = config.frameRate || 30;
      config.bitrate = config.bitrate || 1200;
      config.realtime = config.realtime || true;
      function createBufferURL(buffer, type) {
        return URL.createObjectURL(new Blob([buffer], {
          type: type || ""
        }));
      }
      var finished;
      function cameraStream() {
        return new ReadableStream({
          start: function(controller) {
            var cvs = document.createElement("canvas");
            var video = document.createElement("video");
            var first = true;
            video.srcObject = stream;
            video.muted = true;
            video.height = config.height;
            video.width = config.width;
            video.volume = 0;
            video.onplaying = function() {
              cvs.width = config.width;
              cvs.height = config.height;
              var ctx = cvs.getContext("2d");
              var frameTimeout = 1e3 / config.frameRate;
              var cameraTimer = setInterval(function f() {
                if (finished) {
                  clearInterval(cameraTimer);
                  controller.close();
                }
                if (first) {
                  first = false;
                  if (config.onVideoProcessStarted) {
                    config.onVideoProcessStarted();
                  }
                }
                ctx.drawImage(video, 0, 0);
                if (controller._controlledReadableStream.state !== "closed") {
                  try {
                    controller.enqueue(
                      ctx.getImageData(0, 0, config.width, config.height)
                    );
                  } catch (e) {
                  }
                }
              }, frameTimeout);
            };
            video.play();
          }
        });
      }
      var worker;
      function startRecording(stream2, buffer) {
        if (!config.workerPath && !buffer) {
          finished = false;
          fetch(
            "https://unpkg.com/webm-wasm@latest/dist/webm-worker.js"
          ).then(function(r) {
            r.arrayBuffer().then(function(buffer2) {
              startRecording(stream2, buffer2);
            });
          });
          return;
        }
        if (!config.workerPath && buffer instanceof ArrayBuffer) {
          var blob = new Blob([buffer], {
            type: "text/javascript"
          });
          config.workerPath = URL.createObjectURL(blob);
        }
        if (!config.workerPath) {
          console.error("workerPath parameter is missing.");
        }
        worker = new Worker(config.workerPath);
        worker.postMessage(config.webAssemblyPath || "https://unpkg.com/webm-wasm@latest/dist/webm-wasm.wasm");
        worker.addEventListener("message", function(event) {
          if (event.data === "READY") {
            worker.postMessage({
              width: config.width,
              height: config.height,
              bitrate: config.bitrate || 1200,
              timebaseDen: config.frameRate || 30,
              realtime: config.realtime
            });
            cameraStream().pipeTo(new WritableStream({
              write: function(image) {
                if (finished) {
                  console.error("Got image, but recorder is finished!");
                  return;
                }
                worker.postMessage(image.data.buffer, [image.data.buffer]);
              }
            }));
          } else if (!!event.data) {
            if (!isPaused) {
              arrayOfBuffers.push(event.data);
            }
          }
        });
      }
      this.record = function() {
        arrayOfBuffers = [];
        isPaused = false;
        this.blob = null;
        startRecording(stream);
        if (typeof config.initCallback === "function") {
          config.initCallback();
        }
      };
      var isPaused;
      this.pause = function() {
        isPaused = true;
      };
      this.resume = function() {
        isPaused = false;
      };
      function terminate(callback) {
        if (!worker) {
          if (callback) {
            callback();
          }
          return;
        }
        worker.addEventListener("message", function(event) {
          if (event.data === null) {
            worker.terminate();
            worker = null;
            if (callback) {
              callback();
            }
          }
        });
        worker.postMessage(null);
      }
      var arrayOfBuffers = [];
      this.stop = function(callback) {
        finished = true;
        var recorder = this;
        terminate(function() {
          recorder.blob = new Blob(arrayOfBuffers, {
            type: "video/webm"
          });
          callback(recorder.blob);
        });
      };
      this.name = "WebAssemblyRecorder";
      this.toString = function() {
        return this.name;
      };
      this.clearRecordedData = function() {
        arrayOfBuffers = [];
        isPaused = false;
        this.blob = null;
      };
      this.blob = null;
    }
    if (typeof RecordRTC !== "undefined") {
      RecordRTC.WebAssemblyRecorder = WebAssemblyRecorder;
    }
  }
});

export {
  require_RecordRTC
};
/*! Bundled license information:

recordrtc/RecordRTC.js:
  (**
   * {@link https://github.com/muaz-khan/RecordRTC|RecordRTC} is a WebRTC JavaScript library for audio/video as well as screen activity recording. It supports Chrome, Firefox, Opera, Android, and Microsoft Edge. Platforms: Linux, Mac and Windows. 
   * @summary Record audio, video or screen inside the browser.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef RecordRTC
   * @class
   * @example
   * var recorder = RecordRTC(mediaStream or [arrayOfMediaStream], {
   *     type: 'video', // audio or video or gif or canvas
   *     recorderType: MediaStreamRecorder || CanvasRecorder || StereoAudioRecorder || Etc
   * });
   * recorder.startRecording();
   * @see For further information:
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
   * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, desiredSampRate: 16000, video: HTMLVideoElement, etc.}
   *)
  (**
   * {@link RecordRTCConfiguration} is an inner/private helper for {@link RecordRTC}.
   * @summary It configures the 2nd parameter passed over {@link RecordRTC} and returns a valid "config" object.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef RecordRTCConfiguration
   * @class
   * @example
   * var options = RecordRTCConfiguration(mediaStream, options);
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
   * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, getNativeBlob:true, etc.}
   *)
  (**
   * {@link GetRecorderType} is an inner/private helper for {@link RecordRTC}.
   * @summary It returns best recorder-type available for your browser.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef GetRecorderType
   * @class
   * @example
   * var RecorderType = GetRecorderType(options);
   * var recorder = new RecorderType(options);
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
   * @param {object} config - {type:"video", disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
   *)
  (**
   * MRecordRTC runs on top of {@link RecordRTC} to bring multiple recordings in a single place, by providing simple API.
   * @summary MRecordRTC stands for "Multiple-RecordRTC".
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef MRecordRTC
   * @class
   * @example
   * var recorder = new MRecordRTC();
   * recorder.addStream(MediaStream);
   * recorder.mediaType = {
   *     audio: true, // or StereoAudioRecorder or MediaStreamRecorder
   *     video: true, // or WhammyRecorder or MediaStreamRecorder or WebAssemblyRecorder or CanvasRecorder
   *     gif: true    // or GifRecorder
   * };
   * // mimeType is optional and should be set only in advance cases.
   * recorder.mimeType = {
   *     audio: 'audio/wav',
   *     video: 'video/webm',
   *     gif:   'image/gif'
   * };
   * recorder.startRecording();
   * @see For further information:
   * @see {@link https://github.com/muaz-khan/RecordRTC/tree/master/MRecordRTC|MRecordRTC Source Code}
   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
   * @requires {@link RecordRTC}
   *)
  (**
   * Storage is a standalone object used by {@link RecordRTC} to store reusable objects e.g. "new AudioContext".
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @example
   * Storage.AudioContext === webkitAudioContext
   * @property {webkitAudioContext} AudioContext - Keeps a reference to AudioContext object.
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   *)
  (**
   * MediaStreamRecorder is an abstraction layer for {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}. It is used by {@link RecordRTC} to record MediaStream(s) in both Chrome and Firefox.
   * @summary Runs top over {@link https://w3c.github.io/mediacapture-record/MediaRecorder.html|MediaRecorder API}.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://github.com/muaz-khan|Muaz Khan}
   * @typedef MediaStreamRecorder
   * @class
   * @example
   * var config = {
   *     mimeType: 'video/webm', // vp8, vp9, h264, mkv, opus/vorbis
   *     audioBitsPerSecond : 256 * 8 * 1024,
   *     videoBitsPerSecond : 256 * 8 * 1024,
   *     bitsPerSecond: 256 * 8 * 1024,  // if this is provided, skip above two
   *     checkForInactiveTracks: true,
   *     timeSlice: 1000, // concatenate intervals based blobs
   *     ondataavailable: function() {} // get intervals based blobs
   * }
   * var recorder = new MediaStreamRecorder(mediaStream, config);
   * recorder.record();
   * recorder.stop(function(blob) {
   *     video.src = URL.createObjectURL(blob);
   *
   *     // or
   *     var blob = recorder.blob;
   * });
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
   * @param {object} config - {disableLogs:true, initCallback: function, mimeType: "video/webm", timeSlice: 1000}
   * @throws Will throw an error if first argument "MediaStream" is missing. Also throws error if "MediaRecorder API" are not supported by the browser.
   *)
  (**
   * StereoAudioRecorder is a standalone class used by {@link RecordRTC} to bring "stereo" audio-recording in chrome.
   * @summary JavaScript standalone object for stereo audio recording.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef StereoAudioRecorder
   * @class
   * @example
   * var recorder = new StereoAudioRecorder(MediaStream, {
   *     sampleRate: 44100,
   *     bufferSize: 4096
   * });
   * recorder.record();
   * recorder.stop(function(blob) {
   *     video.src = URL.createObjectURL(blob);
   * });
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
   * @param {object} config - {sampleRate: 44100, bufferSize: 4096, numberOfAudioChannels: 1, etc.}
   *)
  (**
   * CanvasRecorder is a standalone class used by {@link RecordRTC} to bring HTML5-Canvas recording into video WebM. It uses HTML2Canvas library and runs top over {@link Whammy}.
   * @summary HTML2Canvas recording into video WebM.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef CanvasRecorder
   * @class
   * @example
   * var recorder = new CanvasRecorder(htmlElement, { disableLogs: true, useWhammyRecorder: true });
   * recorder.record();
   * recorder.stop(function(blob) {
   *     video.src = URL.createObjectURL(blob);
   * });
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {HTMLElement} htmlElement - querySelector/getElementById/getElementsByTagName[0]/etc.
   * @param {object} config - {disableLogs:true, initCallback: function}
   *)
  (**
   * WhammyRecorder is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It runs top over {@link Whammy}.
   * @summary Video recording feature in Chrome.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef WhammyRecorder
   * @class
   * @example
   * var recorder = new WhammyRecorder(mediaStream);
   * recorder.record();
   * recorder.stop(function(blob) {
   *     video.src = URL.createObjectURL(blob);
   * });
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
   * @param {object} config - {disableLogs: true, initCallback: function, video: HTMLVideoElement, etc.}
   *)
  (**
   * Whammy is a standalone class used by {@link RecordRTC} to bring video recording in Chrome. It is written by {@link https://github.com/antimatter15|antimatter15}
   * @summary A real time javascript webm encoder based on a canvas hack.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef Whammy
   * @class
   * @example
   * var recorder = new Whammy().Video(15);
   * recorder.add(context || canvas || dataURL);
   * var output = recorder.compile();
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   *)
  (**
   * DiskStorage is a standalone object used by {@link RecordRTC} to store recorded blobs in IndexedDB storage.
   * @summary Writing blobs into IndexedDB.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @example
   * DiskStorage.Store({
   *     audioBlob: yourAudioBlob,
   *     videoBlob: yourVideoBlob,
   *     gifBlob  : yourGifBlob
   * });
   * DiskStorage.Fetch(function(dataURL, type) {
   *     if(type === 'audioBlob') { }
   *     if(type === 'videoBlob') { }
   *     if(type === 'gifBlob')   { }
   * });
   * // DiskStorage.dataStoreName = 'recordRTC';
   * // DiskStorage.onError = function(error) { };
   * @property {function} init - This method must be called once to initialize IndexedDB ObjectStore. Though, it is auto-used internally.
   * @property {function} Fetch - This method fetches stored blobs from IndexedDB.
   * @property {function} Store - This method stores blobs in IndexedDB.
   * @property {function} onError - This function is invoked for any known/unknown error.
   * @property {string} dataStoreName - Name of the ObjectStore created in IndexedDB storage.
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   *)
  (**
   * GifRecorder is standalone calss used by {@link RecordRTC} to record video or canvas into animated gif.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef GifRecorder
   * @class
   * @example
   * var recorder = new GifRecorder(mediaStream || canvas || context, { onGifPreview: function, onGifRecordingStarted: function, width: 1280, height: 720, frameRate: 200, quality: 10 });
   * recorder.record();
   * recorder.stop(function(blob) {
   *     img.src = URL.createObjectURL(blob);
   * });
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - MediaStream object or HTMLCanvasElement or CanvasRenderingContext2D.
   * @param {object} config - {disableLogs:true, initCallback: function, width: 320, height: 240, frameRate: 200, quality: 10}
   *)
  (**
   * MultiStreamRecorder can record multiple videos in single container.
   * @summary Multi-videos recorder.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef MultiStreamRecorder
   * @class
   * @example
   * var options = {
   *     mimeType: 'video/webm'
   * }
   * var recorder = new MultiStreamRecorder(ArrayOfMediaStreams, options);
   * recorder.record();
   * recorder.stop(function(blob) {
   *     video.src = URL.createObjectURL(blob);
   *
   *     // or
   *     var blob = recorder.blob;
   * });
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStreams} mediaStreams - Array of MediaStreams.
   * @param {object} config - {disableLogs:true, frameInterval: 1, mimeType: "video/webm"}
   *)
  (**
   * RecordRTCPromisesHandler adds promises support in {@link RecordRTC}. Try a {@link https://github.com/muaz-khan/RecordRTC/blob/master/simple-demos/RecordRTCPromisesHandler.html|demo here}
   * @summary Promises for {@link RecordRTC}
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef RecordRTCPromisesHandler
   * @class
   * @example
   * var recorder = new RecordRTCPromisesHandler(mediaStream, options);
   * recorder.startRecording()
   *         .then(successCB)
   *         .catch(errorCB);
   * // Note: You can access all RecordRTC API using "recorder.recordRTC" e.g. 
   * recorder.recordRTC.onStateChanged = function(state) {};
   * recorder.recordRTC.setRecordingDuration(5000);
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - Single media-stream object, array of media-streams, html-canvas-element, etc.
   * @param {object} config - {type:"video", recorderType: MediaStreamRecorder, disableLogs: true, numberOfAudioChannels: 1, bufferSize: 0, sampleRate: 0, video: HTMLVideoElement, etc.}
   * @throws Will throw an error if "new" keyword is not used to initiate "RecordRTCPromisesHandler". Also throws error if first argument "MediaStream" is missing.
   * @requires {@link RecordRTC}
   *)
  (**
   * WebAssemblyRecorder lets you create webm videos in JavaScript via WebAssembly. The library consumes raw RGBA32 buffers (4 bytes per pixel) and turns them into a webm video with the given framerate and quality. This makes it compatible out-of-the-box with ImageData from a CANVAS. With realtime mode you can also use webm-wasm for streaming webm videos.
   * @summary Video recording feature in Chrome, Firefox and maybe Edge.
   * @license {@link https://github.com/muaz-khan/RecordRTC/blob/master/LICENSE|MIT}
   * @author {@link https://MuazKhan.com|Muaz Khan}
   * @typedef WebAssemblyRecorder
   * @class
   * @example
   * var recorder = new WebAssemblyRecorder(mediaStream);
   * recorder.record();
   * recorder.stop(function(blob) {
   *     video.src = URL.createObjectURL(blob);
   * });
   * @see {@link https://github.com/muaz-khan/RecordRTC|RecordRTC Source Code}
   * @param {MediaStream} mediaStream - MediaStream object fetched using getUserMedia API or generated using captureStreamUntilEnded or WebAudio API.
   * @param {object} config - {webAssemblyPath:'webm-wasm.wasm',workerPath: 'webm-worker.js', frameRate: 30, width: 1920, height: 1080, bitrate: 1024, realtime: true}
   *)
*/
//# sourceMappingURL=chunk-WR6UJEND.js.map
