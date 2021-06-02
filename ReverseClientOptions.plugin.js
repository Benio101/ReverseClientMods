/**
 * @name ReverseClientMods
 * @description Plugin do zarządzania modyfikacjami na serwerze Reverse Community.
 * @website https://github.com/Benio101/ReverseClientMods
 * @github https://github.com/Benio101/ReverseClientMods
 * @github_raw https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/ReverseClientMods.plugin.js
 * @updateUrl https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/ReverseClientMods.plugin.js
 * @source https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/ReverseClientMods.plugin.js
 * @author Benio
 * @authorId 231850998279176193
 * @invite reversecommunity
 */

 module.exports = (() =>
 {
	 // ------------------------------------------------------------------------------------------------------------
	 // ------------------------------------ Config ----------------------------------------------------------------
	 // ------------------------------------------------------------------------------------------------------------
 
	 const config =
	 {
		 info:
		 {
			 name: 'ReverseClientMods',
			 description: 'Plugin do zarządzania modyfikacjami na serwerze Reverse Community.',
			 website: 'https://github.com/Benio101/ReverseClientMods',
			 github: 'https://github.com/Benio101/ReverseClientMods',
			 github_raw: 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/ReverseClientMods.plugin.js',
			 updateUrl: 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/ReverseClientMods.plugin.js',
			 source: 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/ReverseClientMods.plugin.js',
			 author: 'Benio',
			 authorId: '231850998279176193',
			 invite: 'reversecommunity',
			 version: '1.0.0',
		 },
	 };
	 return (([Plugin, BDFDB]) =>
	 {
		 GBDFDB = BDFDB;
		 return class ReverseClientMods extends Plugin
		 {
			 onLoad()
			 {
				 
			 }
 
			 onStart()
			 {

			 }
 
			 onStop()
			 {

			 }
 
			 update()
			 {

			 }
		 };
	 })(window.BDFDB_Global.PluginUtils.buildPlugin(config));
 })();
