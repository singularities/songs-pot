import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check'

import { Bands, Songs } from '../../../imports/collections';
import { bandPermission } from './checkers';

Meteor.methods({
  'song.insert'(params) {

    check(params.bandId, bandPermission);

    let band = Bands.collection.findOne({ _id: params.bandId });

    let songId = Songs.collection.insert({
      bandId: params.bandId,
      audioIds: [],
      createdAt: new Date()
    });

    band.songIds.push(songId);

    Bands.collection.update({
      _id: band._id
    },{
      $set: {
        songIds: band.songIds
      }
    });

    return songId;
  },

  'song.update'(id, newParams) {

    check(id, String);

    check(newParams, {
      title: Match.Maybe(String),
      text: Match.Maybe(String),
      audioIds: Match.Maybe([String])
    });

    let song = Songs.collection.findOne({ _id: id });

    check(song, Object);

    check(song.bandId, bandPermission);

    Songs.collection.update({ _id: id }, {
      $set: newParams
    })
  },

  'song.remove'(id) {
    check(id, String)

    let song = Songs.collection.findOne({ _id: id });

    check(song, Object);

    check(song.bandId, bandPermission);

    Songs.collection.remove(id);
  }
});
