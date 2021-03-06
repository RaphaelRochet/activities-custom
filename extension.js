
/*
  Activities Customization
*/

const Lang = imports.lang;

const St = imports.gi.St;
const Gio = imports.gi.Gio;

const Main = imports.ui.main;

const ExtensionUtils = imports.misc.extensionUtils;
const Me = ExtensionUtils.getCurrentExtension();

const Customization = new Lang.Class({
	Name: 'activites-custom',

	_init : function() {
	},

	enable: function() {

		// We look for the ActivitiesButton item
		this._activitiesButton = Main.panel.statusArea['activities'] ;

		// We keep a ref to the original button content, and unlink it from the button
		this._oldActor = this._activitiesButton.actor.label_actor;
		this._activitiesButton.actor.remove_actor(this._oldActor);

		// We create a new Icon and put it in the button
		let gicon = Gio.icon_new_for_string( Me.dir.get_child('icons').get_path() + "/activities-gnome-symbolic.svg" );
		this._icon = new St.Icon({gicon: gicon, style_class: 'activities-icon'});
		this._icon.set_style('icon-size: 1.5em;');
		this._activitiesButton.actor.add_actor(this._icon);

	},

	disable: function() {

		// Remove and destroy our Icon
		this._activitiesButton.actor.remove_actor(this._icon);
		this._icon.destroy();

		// Put the original actor back in place
		this._activitiesButton.actor.add_actor(this._oldActor);

	},

});

function init(metadata) {
	return new Customization();
}
