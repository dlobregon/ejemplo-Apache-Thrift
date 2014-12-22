//
// Autogenerated by Thrift Compiler (0.9.2)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
var thrift = require('node-thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./twit_types');
//HELPER FUNCTIONS AND STRUCTURES

Publicar_guardar_args = function(args) {
  this.tw = null;
  if (args) {
    if (args.tw !== undefined) {
      this.tw = args.tw;
    }
  }
};
Publicar_guardar_args.prototype = {};
Publicar_guardar_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.STRUCT) {
        this.tw = new ttypes.Twit();
        this.tw.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Publicar_guardar_args.prototype.write = function(output) {
  output.writeStructBegin('Publicar_guardar_args');
  if (this.tw !== null && this.tw !== undefined) {
    output.writeFieldBegin('tw', Thrift.Type.STRUCT, 1);
    this.tw.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

Publicar_guardar_result = function(args) {
};
Publicar_guardar_result.prototype = {};
Publicar_guardar_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    input.skip(ftype);
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

Publicar_guardar_result.prototype.write = function(output) {
  output.writeStructBegin('Publicar_guardar_result');
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

PublicarClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
PublicarClient.prototype = {};
PublicarClient.prototype.seqid = function() { return this._seqid; }
PublicarClient.prototype.new_seqid = function() { return this._seqid += 1; }
PublicarClient.prototype.guardar = function(tw, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_guardar(tw);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_guardar(tw);
  }
};

PublicarClient.prototype.send_guardar = function(tw) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('guardar', Thrift.MessageType.CALL, this.seqid());
  var args = new Publicar_guardar_args();
  args.tw = tw;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

PublicarClient.prototype.recv_guardar = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new Publicar_guardar_result();
  result.read(input);
  input.readMessageEnd();

  callback(null)
};
PublicarProcessor = exports.Processor = function(handler) {
  this._handler = handler
}
PublicarProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}

PublicarProcessor.prototype.process_guardar = function(seqid, input, output) {
  var args = new Publicar_guardar_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.guardar.length === 1) {
    Q.fcall(this._handler.guardar, args.tw)
      .then(function(result) {
        var result = new Publicar_guardar_result({success: result});
        output.writeMessageBegin("guardar", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result = new Publicar_guardar_result(err);
        output.writeMessageBegin("guardar", Thrift.MessageType.REPLY, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.guardar(args.tw,  function (err, result) {
      var result = new Publicar_guardar_result((err != null ? err : {success: result}));
      output.writeMessageBegin("guardar", Thrift.MessageType.REPLY, seqid);
      result.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
}