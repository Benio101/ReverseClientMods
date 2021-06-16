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

module.exports = (() => {
	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ Config ----------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	const config = {
		info: {
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
			version: '1.1.0',
		},
		changeLog: {
			// added: {},
			// fixed: {},
			improved: {
				'TOR 2.7.0': 'Updated The Other Roles to v2.7.0',
			},
		},

		// milliseconds
		time:
		{
			send_message_timeout:   {min: 1e3, max: 2e3},
			edit_message_timeout:   {min: 1e3, max: 2e3},
			delete_message_timeout: {min: 1e3, max: 2e3},
			pin_message_timeout:    {min: 1e3, max: 2e3},
			
			wait_for_message_interval: 1e2,
		},
	};

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ Constants--------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	const channels = {
		tor: {
			role: '842550568757231666',
		},
	};

	const guild_id = '781584193045266439';

	const embed_colors = {
		red: 15158332,
		green: 3066993,
		blue: 3447003,
		yellow: 16776960,
		gray: 9807270,
	};

	const enqueue_types = {
		send: 0,
		edit: 1,
	};

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ CSS -------------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	const css = `
		#channel-context-${config.info.name + '-update-tor-desc'} {
			color: #4fdc7b;
		}
		#channel-context-${config.info.name + '-update-tor-desc'}[class*=focus] {
			color: #FFFFFF;
			background: #3ba55c;
		}
	/*
		#channel-context-${config.info.name + '-Menu-ChannelContextMenu'} {}
		#channel-context-${config.info.name + '-Menu-ChannelContextMenu'}.da-focused {}
		#channel-context-${config.info.name + '-Menu-ChannelContextMenu--update-tor-desc'} {}
		#channel-context-${config.info.name + '-Menu-ChannelContextMenu--update-tor-desc'}.da-focused {}
	*/`;

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ Discord Classes -------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	const discord_classes = {};
	discord_classes.enqueue = BdApi.findModuleByProps('enqueue');

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ Discord Actions -------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	const discord_actions = {};
	discord_actions.createBotMessage = BdApi.findModuleByProps('createBotMessage').createBotMessage;
	discord_actions.deleteMessage = BdApi.findModuleByProps('deleteMessage').deleteMessage;
	discord_actions.getChannelId = BdApi.findModuleByProps('getChannelId').getChannelId;
	discord_actions.getMessages = BdApi.findModuleByProps('getMessages').getMessages;
	discord_actions.pinMessage = BdApi.findModuleByProps('pinMessage').pinMessage;

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ Actions ---------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	const actions = {};

	actions.send_message = async (channel_id, message) => {
		let return_value;
		discord_classes.enqueue.enqueue({
			type: enqueue_types.send,
			message: {
				channelId: channel_id,
				content: message,
				tts: false,
				nonce: discord_actions.createBotMessage(channel_id, '').id,
				embed: false,
			},
		}, r => return_value = r);
	
		while (return_value === undefined)
			await timeout(config.time.wait_for_message_interval);
	
		await timeout(random(config.time.send_message_timeout.min, config.time.send_message_timeout.max));
		return return_value;
	};

//	actions.send_message_reference = async (channel_id, message, message_reference_id) => {
//		let return_value;
//		discord_classes.enqueue.enqueue({
//			type: enqueue_types.send,
//			message: {
//				channelId: channel_id,
//				content: message,
//				tts: false,
//				nonce: discord_actions.createBotMessage(channel_id, '').id,
//				embed: false,
//				message_reference: {message_id: message_reference_id},
//			},
//		}, r => return_value = r);
//	
//		while (return_value === undefined)
//			await timeout(config.time.wait_for_message_interval);
//	
//		await timeout(random(config.time.send_message_timeout.min, config.time.send_message_timeout.max));
//		return return_value;
//	};

	actions.send_embed = async (channel_id, color, title = null, description = null, footer = null) => {
		let return_value;
		discord_classes.enqueue.enqueue({
			type: enqueue_types.send,
			message: {
				channelId: channel_id,
				content: '',
				tts: false,
				nonce: discord_actions.createBotMessage(channel_id, '').id,
				embed: {color: color, title: title, description: description, footer: {text: footer}},
			},
		}, r => return_value = r);
	
		while (return_value === undefined)
			await timeout(config.time.wait_for_message_interval);
	
		await timeout(random(config.time.send_message_timeout.min, config.time.send_message_timeout.max));
		return return_value;
	}

	actions.send_image = async (channel_id, url, color, title = null, description = null, footer = null) => {
		let return_value;
		discord_classes.enqueue.enqueue({
			type: enqueue_types.send,
			message: {
				channelId: channel_id,
				content: '',
				tts: false,
				nonce: discord_actions.createBotMessage(channel_id, '').id,
				embed: {type: 'image', image: {url: url}, color: color, title: title, description: description, footer: {text: footer}},
			},
		}, r => return_value = r);
	
		while (return_value === undefined)
			await timeout(config.time.wait_for_message_interval);
	
		await timeout(random(config.time.send_message_timeout.min, config.time.send_message_timeout.max));
		return return_value;
	}

	actions.edit_message = async (channel_id, message_id, message) => {
		let return_value;
		discord_classes.enqueue.enqueue({
			type: enqueue_types.edit,
			message: {
				channelId: channel_id,
				messageId: message_id,
				content: message,
				embed: false,
			},
		}, r => return_value = r);
	
		while (return_value === undefined)
			await timeout(config.time.wait_for_message_interval);
	
		await timeout(random(config.time.edit_message_timeout.min, config.time.edit_message_timeout.max));
		return return_value;
	};

	actions.edit_embed = async (channel_id, message_id, color, title = null, description = null, footer = null) => {
		let return_value;
		discord_classes.enqueue.enqueue({
			type: enqueue_types.edit,
			message: {
				channelId: channel_id,
				messageId: message_id,
				embed: {color: color, title: title, description: description, footer: {text: footer}},
			},
		}, r => return_value = r);
	
		while (return_value === undefined)
			await timeout(config.time.wait_for_message_interval);
	
		await timeout(random(config.time.edit_message_timeout.min, config.time.edit_message_timeout.max));
		return return_value;
	};

	actions.edit_image = async (channel_id, message_id, url, color, title = null, description = null, footer = null) => {
		let return_value;
		discord_classes.enqueue.enqueue({
			type: enqueue_types.edit,
			message: {
				channelId: channel_id,
				messageId: message_id,
				embed: {type: 'image', image: {url: url}, color: color, title: title, description: description, footer: {text: footer}},
			},
		}, r => return_value = r);
	
		while (return_value === undefined)
			await timeout(config.time.wait_for_message_interval);
	
		await timeout(random(config.time.edit_message_timeout.min, config.time.edit_message_timeout.max));
		return return_value;
	};
	
	actions.delete_message = async (channel_id, message_id) => {
		await discord_actions.deleteMessage(channel_id, message_id);
		await timeout(random(config.time.delete_message_timeout.min, config.time.delete_message_timeout.max));
	}

	actions.pin_message = async (channel_id, message_id) => {
		discord_actions.pinMessage({id: channel_id}, {pinned: false, id: message_id}, {shiftKey: true});
		await timeout(random(config.time.pin_message_timeout.min, config.time.pin_message_timeout.max));
	}

	actions.purge_channel = async (channel_id) => {
		const messages = await get_messages(channel_id);
		const messages_no = messages.length;

		for (const message of messages)
			await actions.delete_message(message.channel_id, message.id);

		if (messages_no > 0)
			await actions.purge_channel(channel_id);
	}

	actions.remove_pushpins = async (channel_id) => {
		const messages = await get_messages(channel_id);
		for (const message of messages)
			if (message.type == 6)
				await actions.delete_message(message.channel_id, message.id);
	}

	actions.update_tor_desc = async () => {
		log('Update channel: Start');
		
		const roles_id = {
			crewmates: {},
			neutrals: {},
			impostors: {},
		};

		// Purge channel
		log('Purge channel: Start');
		await actions.purge_channel(channels.tor.role);
		log('Purge channel: Complete');

		// Prepare top toc placeholders
		log('Prepare top toc placeholders: Start');
		const toc_top_crewmates_id = (await actions.send_message(channels.tor.role, '​')).body.id;
		const toc_top_neutrals_id = (await actions.send_message(channels.tor.role, '​')).body.id;
		const toc_top_impostors_id = (await actions.send_message(channels.tor.role, '​')).body.id;
		log('Prepare top toc placeholders: Complete');

		const spacer_text =
				`[Role wspólników](https://discord.com/channels/${guild_id}/${channels.tor.role}/${toc_top_crewmates_id})\n`
			+	`[Role neutralne](https://discord.com/channels/${guild_id}/${channels.tor.role}/${toc_top_neutrals_id})\n`
			+	`[Role oszustów](https://discord.com/channels/${guild_id}/${channels.tor.role}/${toc_top_impostors_id})`
		;

		// Send crewmate roles
		log('Send crewmate roles: Start');

		// Detective
		roles_id.crewmates['Detective'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_detective.png', embed_colors.green, 'Detective', '• Nazwa: **Detective** (Detektyw)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Footprints (Ślady stóp)', 'Detektyw widzi ślady stóp pozostawione przez inne postaci.', 'Zdolność pasywna');
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Clues (Wskazówki)', 'Przy zgłaszaniu zwłok, Detektyw otrzymuje wskazówki dotyczące tożsamości zabójcy. Rodzaj otrzymywanych informacji zależy od czasu, jaki zajęło Detektywowi znalezienie zwłok.', 'Zdolność pasywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/indicator_footprint.png', embed_colors.blue, 'Wskaźnik', '• Ślad Stopy');
		await actions.send_message(channels.tor.role, `​​​​​

**Uwagi**

	• Kiedy postaci zmieniają kolory (z powodu przemiany lub kamuflażu), wszystkie ślady stóp również zmieniają kolor (także te, które były już na ziemi).
		Jeśli efekty się skończą, wszystkie ślady wracają do oryginalnego koloru.
	• Detektyw nie widzi śladów postaci siedzących w otworach wentylacyjnych.

​`);
		await actions.send_message(channels.tor.role, `​​​​​

**Ustawienia**
Ustawienia dla roli Detektywa.

> **Detective Spawn Chance**
> Szansa na pojawienie się Detektywa w grze.
> 
> **Anonymous Footprints**
> Czy ślady stóp mają być anonimowe.
> 
>     • *True*
>        Wszystkie ślady stóp będą miały ten sam kolor.
> 
>     • *False*
>        Ślady stóp przyjmą kolor postaci, która je zostawiła.
> 
> **Footprint Intervall**
> Czas pomiędzy kolejnymi śladami stóp.
> 
> **Footprint Duration**
> Jak długo ślady stóp pozostają widoczne.
> 
> **Time Where Detective Reports Will Have Name**
> Czas, w ciągu którego Detektyw musi zgłosić ciało, by zobaczyć nick zabójcy.
> 
> **Time Where Detective Reports Will Have Color Type**
> Czas, w ciągu którego Detektyw musi zgłosić ciało, by zobaczyć typ koloru zabójcy.

​`);
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/colors.png', embed_colors.blue, 'Kolory', 'Rozpiska kolorów jaśniejszych *(lighter)* oraz ciemniejszych *(darker)*.');
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Engineer
		roles_id.crewmates['Engineer'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_engineer.png', embed_colors.green, 'Engineer', '• Nazwa: **Engineer** (Inżynier)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_message(channels.tor.role, `​

**Zdolności aktywne**
Inżynier posiada dwie zdolności aktywne:

​`);
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_vent.png', embed_colors.green, 'Vent (Wejdź do Otworu Wentylacyjnego)', 'Inżynier może korzystać z otworów wentylacyjnych (tak, jak zwykli oszuści). Jeśli Inżynier znajduje się w otworze wentylacyjnym, oszuści zobaczą niebieski kontur wokół wszystkich otworów wentylacyjnych na mapie (w celu ich ostrzeżenia). Ze względu na otwory wentylacyjne, gracz wcielający się w rolę Inżyniera może nie być w stanie uruchomić niektórych zadań za pomocą przycisku Use (Użyj). Można zamiast tego dwukrotnie klikać na zadania, by rozpocząć ich wykonywanie.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_repair.png', embed_colors.green, 'Repair (Naprawa Sabotażu)', 'Żywy Inżynier może naprawić jeden sabotaż na grę z dowolnego miejsca na mapie.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Przycisk zabijania oszusta aktywuje się, gdy stanie obok otworu wentylacyjnego, w którym znajduje się Inżynier. Tam też może go zabić.
    • Żadne inne działanie (np. Próbka Zmiennokształtnego, Przejęcie Roli Zabieracza) nie może wpływać na postaci wewnątrz otworów wentylacyjnych.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienie**
Ustawienie dla roli Inżyniera.

> **Engineer Spawn Chance**
> Szansa na pojawienie się Inżyniera w grze.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Hacker
		roles_id.crewmates['Hacker'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_hacker.png', embed_colors.green, 'Hacker', '• Nazwa: **Hacker** (Haker)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_hack.png', embed_colors.green, 'Hack (Włamanie)', 'Haker widzi kolory postaci (albo ich typy, w zależności od ustawień) na panelu administracyjnym. Haker widzi dokładny czas zgonu postaci na monitorze życia.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwaga**

    • Zmiany kolorów wynikające ze Zmiany Kształtu Zmiennokształtnego oraz Kamuflażu Kamuflażysty zostaną odzwierciedlone na panelu administracyjnym.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Hakera.

> **Hacker Spawn Chance**
> Szansa na pojawienie się Hakera w grze.
> 
> **Hacker Cooldown**
> Czas odnowienia się umiejętności aktywnej Włamanie.
> 
> **Hacker Duration**
> Czas trwania Włamania.
> 
> **Hacker Only Sees Color Type**
> Czy Haker ma widzieć jedynie typ koloru.
> 
>     • *True*
>        Zamiast dokładnego koloru na panelu administracyjnym, Haker zobaczy jedynie jego typ koloru:
> 
>            • Biały kolor w przypadku postaci o kolorze jaśniejszym *(lighter)*
>            • Szary kolor w przypadku postaci o kolorze ciemniejszym *(darker)*.
> 
>     • *False*
>        Haker będzie widział dokładny kolor postaci na panelu administracyjnym.

​`);
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/colors.png', embed_colors.blue, 'Kolory', 'Rozpiska kolorów jaśniejszych *(lighter)* oraz ciemniejszych *(darker)*.');
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Lighter
		roles_id.crewmates['Lighter'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_lighter.png', embed_colors.green, 'Lighter', '• Nazwa: **Lighter** (Latarnik)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_lighter.png', embed_colors.green, 'Light (Włącz Latarkę)', 'Latarnik włącza na określony czas swoją latarkę, by zwiększyć swoje pole widzenia.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Latarnika.

> **Lighter Spawn Chance**
> Szansa na pojawienie się Latarnika w grze.
> 
> **Lighter Mode Vision On Lights On**
> Pole widzenia Latarnika, gdy zarówno światła, jak i jego latarka są włączone.
> 
> **Lighter Mode Vision On Lights Off**
> Pole widzenia Latarnika, gdy jego latarka jest włączona, zaś światła nie.
> 
> **Lighter Cooldown**
> Czas odnowienia się umiejętności aktywnej Włącz Latarkę.
> 
> **Lighter Duration**
> Czas trwania Włączonej Latarki.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Lover
		roles_id.crewmates['Lover'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_lover.png', embed_colors.green, 'Lover', '• Nazwa: **Lover** (Kochanek)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Love (Miłość)', 'Kochanek zawsze pojawia się w parze z drugim Kochankiem albo z OszuKochankiem. Celem Kochanka jest pozostanie przy życiu do końca gry. Jeśli partner Kochanka umrze, Kochanek popełni samobójstwo (jeśli opcja *Both Lovers Die* jest aktywna). Kochanek nie zna roli swojego partnera, wie tylko, kto nim jest. Partnerzy wygrywają, jeśli obaj będą żywi wśród ostatnich 3 graczy, ale mogą również wygrać swoją odpowiednią rolą. Jeśli wspólnicy wygrają, a wśród nich jest dwóch Kochanków, wówczas wspólnicy wygrywają, a Kochankowie zdobywają podwójne zwycięstwo. Jeśli ostatnimi 3 żywymi osobami będzie Kochanek, OszuKochanek oraz inny oszust, wówczas wygrywają jedynie partnerzy jako Solo Zwycięstwo Kochanków. Jeśli w grze jest OszuKochanek, zadania Kochanka nie będą liczone do progresu paska zadań, dopóki OszuKochanek żyje.', 'Zdolność pasywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Jeśli w grze pozostanie równa liczba wspólników oraz oszustów, a wśród nich OszuKochanek, gra nie kończy się automatycznie.
       Wszak partnerzy nadal mogą odnieść Solo Zwycięstwo Kochanków. Na przykład jeśli pozostaną cztery role: Kochanek, inny wspólnik, OszuKochanek oraz inny oszust.
       Wówczas gra nie zakończy się, a następne zabójstwo zadecyduje, czy wygrywają oszuści czy partnerzy.
    • Partnerzy mogą ustalić, czy Zabieracz może ukraść ich role.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia wspólne dla ról Kochanek oraz OszuKochanek.

> **Lovers Spawn Chance**
> Szansa na pojawienie się Kochanka oraz jego partnera w grze.
> 
> **Chance That One Lover Is Impostor**
> Szansa, że partnerem Kochanka będzie OszuKochanek.
> 
> **Both Lovers Die**
> Czy Kochanek albo OszuKochanek popełni samobójstwo po śmierci partnera.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Mayor
		roles_id.crewmates['Mayor'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_mayor.png', embed_colors.green, 'Mayor', '• Nazwa: **Mayor** (Burmistrz)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Double vote (Podwójny głos)', 'Burmistrz przewodzi wspólnikom, mając głos, który liczy się podwójnie.', 'Zdolność pasywna');
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Voting time (Głosowanie)', 'Burmistrz zawsze może zwołać spotkanie nadzwyczajne nawet, jeśli osiągnięta została maksymalna liczba spotkań nadzwyczajnych.', 'Zdolność pasywna');
		await actions.send_message(channels.tor.role, `​

**Ustawienie**
Ustawienie dla roli Burmistrza.

> **Mayor Spawn Chance**
> Szansa na pojawienie się Burmistrza w grze.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Medic
		roles_id.crewmates['Medic'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_medic.png', embed_colors.green, 'Medic', '• Nazwa: **Medic** (Medyk)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_shield.png', embed_colors.green, 'Shield (Tarcza Medyka)', 'Daje wybranej postaci (zaznaczonej poprzez obrys wokół niej) Tarczę Medyka. Medyk może użyć zdolności Tarcza Medyka tylko raz na grę. Postać objęta Tarczą Medyka jest nie do zabicia. Postać z Tarczą Medyka nadal może zostać wygłosowana oraz może być oszustem. Medyk zobaczy czerwony błysk na ekranie, gdy ktoś spróbuje zabić postać z Tarczą Medyka (jeśli opcja *Shielded Player Sees Murder Attempt* jest aktywna). Jeśli Medyk zginie, Tarcza Medyka zniknie wraz z nim. Szeryf nie umrze, jeśli spróbuje zabić wspólnika z Tarczą Medyka. Szeryf nie dokona zabójstwa, próbując zabić oszusta z Tarczą Medyka.', 'Zdolność aktywna');
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Body inspect (Oględziny zwłok)', 'Medyk będzie wiedział, jak dawno temu zginęła postać, której ciało zgłasza.', 'Zdolność pasywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Jeśli Kochanek albo OszuKochanek zginie, a on lub jego partner ma Tarczę Medyka, to i tak obydwoje zginą.
    • Jeśli Zabieracz lub cel jego Zamiany Ról ma Tarczę Medyka, postać z Tarczą Medyka dokonuje Zamiany Ról.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Medyka.

> **Medic Spawn Chance**
> Szansa na pojawienie się Medyka w grze.
> 
> **Show Shielded Player**
> Kto ma widzieć Tarczę Medyka na postaci.
> 
>     • *Everyone* — Wszyscy
>     • *Shielded + Medic* — Tylko Medyk oraz postać z Tarczą Medyka
>     • *Medyk* — Tylko Medyk
> 
> **Shielded Player Sees Murder Attempt**
> Czy postać z Tarczą Medyka ma widzieć błysk, gdy ktoś próbuje ją zabić.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Nice Guesser
		roles_id.crewmates['Nice Guesser'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_nice_guesser.png', embed_colors.green, 'Nice Guesser', '• Nazwa: **Nice Guesser** (Dobry Zgadywacz)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Guess (Zgadywanie)', 'Podczas spotkania Dobry Zgadywacz może zgadnąć rolę gracza. Jeśli trafi, zastrzeli go. W przeciwnym razie sam zginie. Zgadywać można tyle razy w trakcie spotkania, ile wynosi wartość opcji *Guesser Number Of Shots*. Za wspólników oraz oszustów uznaje się jedynie postaci bez dodatkowych ról. Zdolności Zgadywanie używać można tylko w czasie spotkań.', 'Zdolność specjalna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Głos zastrzelonego w trakcie spotkania gracza się nie liczy.
    • Nie można odgadnąć roli Dobrego Malucha z oczywistych powodów.
    • Nie można ognadnąć roli Kochanka ani OszuKochanka. Należy odgadnąć główną rolę jednego z partnerów, by zabić ich obu.
    • Trafione Zgadywanie wobec Błazna nie spowoduje jego wygranej, jeśli zostanie zastrzelony przed wyrzuceniem.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia wspólne dla ról Dobrego Zgadywacza oraz Złego Zgadywacza.

> **Guesser Spawn Chance**
> Szansa na pojawienie się Dobrego Zgadywacza albo Złego Zgadywacza w grze.
> 
> **Chance That The Guesser Is An Impostor**
> Szansa, że pojawiający się zgadywacz będzie Złym Zgadywaczem.
> 
> **Guesser Number Of Shots**
> Liczba dostępnych Zgadnięć podczas spotkania.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Nice Mini
		roles_id.crewmates['Nice Mini'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_nice_mini.png', embed_colors.green, 'Nice Mini', '• Nazwa: **Nice Mini** (Dobry Maluch)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Invincibility (Niezwyciężoność)', 'Postać Dobrego Malucha jest mniejsza i dlatego jest widoczna dla wszystkich w grze. Dobrego Malucha nie można zabić, dopóki nie dorośnie, jednak można go wygłosować. Dobry Maluch stara się wykorzystać siłę swojej Niezwyciężoności we wczesnej fazie gry. Jeśli Dobry Maluch zostanie wygłosowany przed dorośnięciem, wszyscy przegrywają. Więc pomyśl dwa razy, zanim zagłosujesz na Dobrego Malucha.', 'Zdolność pasywna');
		await actions.send_message(channels.tor.role, `​

**Uwaga**

    • Oszuści nie mogą zabić Dobrego Malucha (przycisk nie działa), dopóki Dobry Maluch nie dorośnie.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia wspólne dla ról Dobry Maluch oraz Zły Maluch.

> **Mini Spawn Chance**
> Szansa na pojawienie się Dobrego Malucha (67% z tej szansy) albo Złego Malucha (33% z tej szansy) w grze.
> 
> **Mini**
> Wiek, w którym maluch dorośnie.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Security Guard
		roles_id.crewmates['Security Guard'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_security_guard.png', embed_colors.green, 'Security Guard', '• Nazwa: **Security Guard** (Strażnik)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_place_camera.png', embed_colors.green, 'Install Camera (Zainstaluj kamerę)', 'Instaluje kamerę dostępną dla wszystkich postaci po następnym spotkaniu.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_seal_vent.png', embed_colors.green, 'Close Vent (Zamknij Otwór Wentylacyjny)', 'Zamyka wybrany otwór wentylacyjny po następnym spotkaniu. Postaci nie mogą wchodzić ani wychodzić z zamkniętych otworów wentylacyjnych, ale nadal mogą dostać się do nich pod ziemią.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/indicator_sealed_vent.png', embed_colors.blue, 'Wskaźniki', '• Zamknięty otwór wentylacyjny (po lewej)\n• Zamknięta dziura w ziemi (po prawej)');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Pudła Machera nie mogą zostać zamknięte.
    • Strażnik nie może instalować kamer na mapie Mira HQ.
    • Liczba pozostałych śrubek jest widoczna nad przyciskiem zdolności aktywnej.
    • Na mapie The Skeld cztery kamery będą zastępowane następnymi co 3 sekundy. Można jednak nawigować nimi manualnie za pomocą przycisków strzałek.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Strażnika.

> **Security Guard Spawn Chance**
> Szansa na pojawienie się Strażnika w grze.
> 
> **Security Guard Cooldown**
> Czas odnowienia się umiejętności aktywnych.
> 
> **Security Guard Number Of Screws**
> Liczba śrubek dostępna dla Strażnika na całą grę.
> 
> **Number Of Screws Per Cam**
> Liczba śrubek zużywanych w celu instalacji kamery.
> 
> **Number Of Screws Per Vent**
> Liczba śrubek zużywanych w celu zamknięcia otworu wentylacyjnego.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Seer
		roles_id.crewmates['Seer'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_seer.png', embed_colors.green, 'Seer', '• Nazwa: **Seer** (Widzący)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Souls (Dusze)', 'Widzący widzi dusze postaci, które zginęły w poprzedniej rundzie. Dusze powoli zanikają.', 'Zdolność pasywna');
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Flash (Błyski)', 'Widzący widzi niebieski błysk na ekranie, gdy któraś z postaci umrze gdziekolwiek na mapie.', 'Zdolność pasywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/indicator_soul.png', embed_colors.blue, 'Wskaźnik', '• Dusza');
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Widzącego.

> **Seer Spawn Chance**
> Szansa na pojawienie się Widzącego w grze.
> 
> **Seer Mode**
> Tryb Widzącego.
> 
>     • *Show death flash and souls*
>        Pokazuje zarówno dusze poległych postaci, jak i niebieskie błyski na ekranie.
> 
>     • *Show death flash*
>        Pokazuje jedynie niebieskie błyski na ekranie.
> 
>     • *Show souls*
>        Pokazuje jedynie dusze poległych postaci.
> 
> **Seer Limit Soul Duration**
> Czy dusze powinny powoli zanikać.
> 
> **Seer Soul Duration**
> Czas po spotkaniu, po którym dusze zanikną.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Sheriff
		roles_id.crewmates['Sheriff'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_sheriff.png', embed_colors.green, 'Sheriff', '• Nazwa: **Sheriff** (Szeryf)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_kill.png', embed_colors.green, 'Shoot (Strzał)', 'Szeryf próbuje zastrzelić swój cel. Jeśli cel jest oszustem (lub ma rolę neutralną, jeśli opcja *Neutrals Can Die To Sheriff* jest aktywna), cel zostanie zabity. W przeciwnym wypadku, cel nie ginie. Zginie matomiast Szeryf.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Jeśli Szeryf strzeli w postać z Tarczą Medyka, nikt nie zginie.
    • Jeśli Szeryf strzeli w dorastającego Złego Malucha, Szeryf zginie.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Szeryfa.

> **Sheriff Spawn Chance**
> Szansa na pojawienie się Szeryfa w grze.
> 
> **Sheriff Cooldown**
> Czas odnowienia się umiejętności aktywnej Strzał.
> 
> **Neutrals Can Die To Sheriff**
> Czy postaci z rolami neutralnymi mają ginąć od strzałów Szeryfa.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Shifter
		roles_id.crewmates['Shifter'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_shifter.png', embed_colors.green, 'Shifter', '• Nazwa: **Shifter** (Zabieracz)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_shift.png', embed_colors.green, 'Shift (Przejęcie Roli)', 'Zabieracz przejmuje rolę wybranego wspólnika. Cel zmiany staje się wspólnikiem. Przejęcie Roli następuje zawsze na końcu spotkania, tuż przed wygłosowaniem gracza. Cel musi zostać wybrany podczas rundy. Przejęcie Roli nastąpi nawet, jeśli Zabieracz lub jego cel umrą przed spotkaniem. Próba przejęcia roli neutralnej lub roli oszusta kończy się niepowodzeniem. Zabieracz popełni samobójstwo na końcu następnego spotkania (nie będzie ciała). Zadaniem Zabieracza jest uratowanie ról przed opuszczeniem gry, np. poprzez przejęcie roli od Szeryfa lub Medyka, których rola znana jest oszustom. Działa to w szczególności dobrze wobec Wymazywacza, lecz daje również Wymazywaczowi możliwość gry w podobny sposób, jak Zabieraczowi.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Przejęcie Roli Zabieracza zawsze następuje przed Wymazaniem Wymazywacza.
    • Jeśli Zabieracz przejmie czyjąś rolę, czas odnowienia umiejętności aktywnych zostanie ustawiony na maksymalny.
    • Umiejętności jednorazowego użytku (np. Tarcza Medyka lub Naprawa Sabotażu Inżyniera) mogą zostać użyte tylko przez jednego gracza.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienie**
Ustawienie dla roli Zabieracza.

> **Shifter Spawn Chance**
> Szansa na pojawienie się Zabieracza w grze.
> 
> **Shifter Shifts Modifiers**
> Czy można ukraść rolę Kochanka lub OszuKochanka oraz czy można ukrać Tarczę Medyka.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Snitch
		roles_id.crewmates['Snitch'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_snitch.png', embed_colors.green, 'Snitch', '• Nazwa: **Snitch** (Kapuś)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Reveal (Ujawnienie)', 'Kiedy Kapuś ukończy wszystkie zadania, pojawią się Strzałki (widoczne tylko dla Kapusia), które wskazują na oszustów. Kiedy Kapusiowi zostanie liczba zadań określona opcją *Task Count Where Impostors See Snitch*, zostanie ujawniony oszustom, również za pomocą Strzałki.', 'Zdolność pasywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/indicator_arrow.png', embed_colors.blue, 'Wskaźnik', '• Strzałka');
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Kapusia.

> **Snitch Spawn Chance**
> Szansa na pojawienie się Kapusia w grze.
> 
> **Task Count Where Impostors See Snitch**
> Odkąd Kapusiowi zostanie tyle zadań do wykonania, oszuści zobaczą go za pomocą Strzałki.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Spy
		roles_id.crewmates['Spy'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_spy.png', embed_colors.green, 'Spy', '• Nazwa: **Spy** (Szpieg)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.green, 'Confuse (Dezorientacja)', 'Szpieg wygląda, jak dodatkowy oszust. Oszuści nie widzą różnicy.', 'Zdolność pasywna');
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Szpiega.

> **Spy Spawn Chance**
> Szansa na pojawienie się Szpiega w grze.
> 
> **Spy Can Die To Sheriff**
> Czy Szeryf może zabić Szpiega.
> 
> **Impostors Can Kill Anyone If There Is A Spy**
> Czy oszuści mogą zabić wszystkich, gdy Szpieg jest w grze.
> 
>     • *True*
>        Oszuści mogą zabić Szpiega, ale mogą również zabić siebie nawzajem.
> 
>     • *False*
>        Oszuści nie mogą zabić Szpiega (ponieważ w przeciwnym wypadku przycisk zabijania ujawniłby im rolę Szpiega).

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Swapper
		roles_id.crewmates['Swapper'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_swapper.png', embed_colors.green, 'Swapper', '• Nazwa: **Swapper** (Zamieniacz)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_swap.png', embed_colors.green, 'Swap (Zamiana Głosów)', 'Podczas spotkań Zamieniacz może zamienić głosy dwóch osób (tj. wszystkie głosy, które otrzymał gracz A, zostaną przekazane graczowi B i odwrotnie). Zamieniacz nie może zwoływać spotkań nadzwyczajnych za pomocą przycisku, chyba że opcja *Swapper can call emergency meeting* jest aktywna. Ze względu na siłę Zamieniacza, nie może on naprawiać świateł, ani łączności.', 'Zdolność specjalna');
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Zamieniacza.

> **Swapper Spawn Chance**
> Szansa na pojawienie się Zamieniacza w grze.
> 
> **Swapper can call emergency meeting**
> Czy Zamieniacz może zwoływać spotkania nadzwyczajne za pomocą przycisku.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Time Master
		roles_id.crewmates['Time Master'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_time_master.png', embed_colors.green, 'Time Master', '• Nazwa: **Time Master** (Władca Czasu)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_time_shield.png', embed_colors.green, 'Time Shield (Tarcza Czasu)', 'Władca Czasu ma Tarczę Czasu, którą może aktywować. Tarcza Czasu pozostaje aktywna przez określony czas. Jeśli ktoś spróbuje zabić Władcę Czasu, gdy Tarcza Czasu jest aktywna, zamiast zabójstwa, nastąpi Cofnięcie Czasu. Czas odnowienia umiejętności zabójcy nie zostanie zresetowany, więc Władca Czasu musi się upewnić, że sytuacja się nie powtórzy. Cofnięcie Czasu nie wpływa na Władcę Czasu.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Cofnięcie Czasu wpływa tylko na ruch.
    • Ukąszenie Wampira spowoduje Cofnięcie Czasu.
    • Jeśli Władca Czasu nie będzie miał aktywnej Tarczy Czasu podczas Ukąszenia Wampira, wciąż może ją aktywować przed następującym zabójstwem.
    • Jeśli Władca Czasu został ofiarą Ukąszenia Wampira i ma aktywną Tarczę Czasu przed zwołaniem spotkania, przeżyje, ale nie nastąpi Cofnięcie Czasu.
    • Jeśli Władca Czasu ma aktywną Tarczę Medyka, nie nastąpi Cofnięcie Czasu.
    • Tarcza Czasu kończy się natychmiast po uruchomieniu, więc Władca Czasu może zostać zaatakowany ponownie, gdy tylko skończy się Cofnięcie Czasu.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Władcy Czasu.

> **Time Master Spawn Chance**
> Szansa na pojawienie się Władcy Czasu w grze.
> 
> **Time Master Cooldown**
> Czas odnowienia się umiejętności aktywnej Tarcza Czasu.
> 
> **Rewind Duration**
> Ile trwa Cofnięcie Czasu.
> 
> **Time Master Shield Duration**
> Ile trwa Tarcza Czasu.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Tracker
		roles_id.crewmates['Tracker'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_tracker.png', embed_colors.green, 'Tracker', '• Nazwa: **Tracker** (Śledczy)\n• Drużyna: **Crewmates** (Wspólnicy)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_track.png', embed_colors.green, 'Track (Śledź)', 'Wybiera jedną postać i śledzi ją do końca gry. Co kilka sekund pozycja śledzonej postaci się aktualizuje. Pozycja śledzonej postaci wskazywana jest poprzez Strzałkę.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/indicator_arrow.png', embed_colors.blue, 'Wskaźnik', '• Strzałka');
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Śledczego.

> **Tracker Spawn Chance**
> Szansa na pojawienie się Śledczego w grze.
> 
> **Tracker Update Intervall**
> Jak często pozycja śledzonej postaci będzie się aktualizować.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		log('Send crewmate roles: Complete');

		// Send neutral roles
		log('Send neutral roles: Start');

		// Arsonist
		roles_id.neutrals['Arsonist'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_arsonist.png', embed_colors.gray, 'Arsonist', '• Nazwa: **Arsonist** (Podpalacz)\n• Drużyna: **Neutral** (Neutralna)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_douse.png', embed_colors.gray, 'Douse (Oblej)', 'Oblewa benzyną inną postać. Gracz musi trzymać przycisk Oblewania, pozostając postacią obok oblewanej postaci przez kilka sekund. Jeśli oblewana postać wyjdzie poza zasięg podczas oblewania, czas odnowienia Oblewania Podpalacza zostanie zresetowany do 0.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_ignite.png', embed_colors.gray, 'Ignite (Podpal)', 'Podpala wszystkie postaci, co skutkuje natychmiastową wygraną Podpalacza. Akcja ta jest dostępna dopiero, gdy wszystkie żywe postaci zostaną oblane benzyną.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwaga**

    • Podpalacz nie ma żadnych zadań, musi wygrać grę solo.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Podpalacza.

> **Arsonist Spawn Chance**
> Szansa na pojawienie się Podpalacza w grze.
> 
> **Arsonist Countdown**
> Czas odnowienia się umiejętności aktywnej Oblej.
> 
> **Arsonist Douse Duration**
> Ile trwa oblewanie postaci benzyną.`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Jackal
		roles_id.neutrals['Jackal'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_jackal.png', embed_colors.gray, 'Jackal', '• Nazwa: **Jackal** (Szakal)\n• Drużyna: **Neutral** (Neutralna)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_sidekick.png', embed_colors.gray, 'Sidekick (Ziomal)', 'Wybiera inną postać na swojego Ziomala. Utworzenie Ziomala usuwa wszystkie jego zadania i dodaje go do drużyny Szakala. Ziomal traci swoją obecną rolę (chyba że jest Kochankiem lub OszuKochankiem, wtedy gra w dwóch drużynach). Akcja Ziomal może być użyta tylko raz na grę (chyba, że opcja *Jackals promoted from Sidekick can create a Sidekick* jest aktywna). Szakal może również awansować oszusta na swojego Ziomala, jednakże:\n\n    • jeśli opcja *Jackals can make an Impostor to his Sidekick* jest aktywna, to oszust zmieni się w Ziomala i opuści drużynę oszustów\n    • w przeciwnym wypadku, cel umiejętności aktywnej Ziomal po prostu będzie wyglądał jak Ziomal, lecz pozostanie oszustem', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Szakal jest częścią dodatkowej drużyny, która stara się wyeliminować wszystkie inne postaci.
    • Szakal nie ma zadań i może zabijać wspólników, postaci z rolami neutralnymi oraz oszustów.
    • Obecność drużyny Szakala udostępnia wiele nowych zakończeń gry, m.in.:

           • Po wyeliminowaniu oszustów, wspólnicy grają przeciwko drużynie Szakala.
           • Po wyeliminowaniu wspólników, drużyna Szakala gra przeciwko oszustom (choć wspólnicy wciąż mogą wygrać poprzez ukończenie wszystkich zadań jako duchy).

    • Szakal oraz Ziomal mogą zostać zabici przez Szeryfa.
    • Szakal nie może zabić dorastającego Dobrego Malucha ani dorastającego Złego Malucha. Może jednak wybrać go na Ziomala, gdy dorośnie.
    • Nawet jeśli wszyscy wspólnicy nie żyją, wciąż mogą wygrać poprzez ukończenie wszystkich zadań jako duchy.
    • Zamiana ostatniego wspólnika z zadaniami do wykonania w Ziomala skutkuje wygraną wspólników.
    • Jeśli zarówno drużyna Szakala, jak i oszuści są w grze, gra toczy się dalej, a wspólnicy wciąż mogą wygrać poprzez ukończenie wszystkich zadań jako duchy.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Szakala.
Ustawienie *Jackal/Sidekick Kill Cooldown* jest wspólne dla ról Szakal oraz Ziomal.

> **Jackal Spawn Chance**
> Szansa na pojawienie się Szakala w grze.
> 
> **Jackal/Sidekick Kill Cooldown**
> Czas odnowienia się akcji zabijania u Szakala oraz Ziomala.
> 
> **Jackal Create Sidekick Cooldown**
> Czas, przed upływem którego Szakal nie może korzystać z umiejętności aktywnej Ziomal.
> 
> **Jackal can use vents**
> Czy Szakal może używać otworów wentylacyjnych.
> 
> **Jackal can create a Sidekick**
> Czy Szakal może użyć umiejętności aktywnej Ziomal.
> 
> **Jackals promoted from Sidekick can create a Sidekick**
> Czy Szakal, który wcześniej był Ziomalem, może użyć umiejętności aktywnej Ziomal.
> 
> **Jackals can make an Impostor to his Sidekick**
> Czy Szakal może użyć umiejętności aktywnej Ziomal na oszustach.`);
		await actions.send_message(channels.tor.role, `​

**Informacja dodatkowa**
Priorytet warunków zwycięstwa jest następujący:

    1. Przegrana wygłosowanego Dobrego Malucha.
    2. Wygrana wygłosowanego Błazna.
    3. Wygrana Podpalacza.
    4. Wygrana oszustów poprzez sabotaż.
    5. Wygrana wspólników poprzez ukończenie wszystkich zadań (możliwe nawet, jeśli wszyscy wspólnicy są martwi).
    6. Wygrana Kochanka oraz jego partnera, gdy zostaną wśród ostatnich 3 żywych graczy.
    7. Wygrana drużyny Szakala dzięki przewadze liczebnej (gdy żyje nie mniej członków drużyny Szakala, niż wspólników, a wszyscy oszuści są martwi)
    8. Wygrana oszustów dzięki przewadze liczebnej (gdy żyje nie mniej oszustów, niż wspólników i nie ma żadnego żywego członka drużyny Szakala)
    9. Wygrana wspólników poprzez przewagę liczebną (gdy nie żyje już żaden oszust ani członek drużyny Szakala)

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Jester
		roles_id.neutrals['Jester'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_jester.png', embed_colors.gray, 'Jester', '• Nazwa: **Jester** (Błazen)\n• Drużyna: **Neutral** (Neutralna)')).body.id;
		await actions.send_message(channels.tor.role, `​

**Uwaga**

    • Błazen nie ma żadnych zadań, musi wygrać grę solo.
    • Błazen wygra, jeśli zostanie wygłosowany podczas spotkania.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Błazna.

> **Jester Spawn Chance**
> Szansa na pojawienie się Błazna w grze.
> 
> **Jester can call emergency meeting**
> Czy Błazen może zwołać spotkanie nadzwyczajne poprzez przycisk.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Sidekick
		roles_id.neutrals['Sidekick'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_sidekick.png', embed_colors.gray, 'Sidekick', '• Nazwa: **Sidekick** (Ziomal)\n• Drużyna: **Neutral** (Neutralna)')).body.id;
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Ziomalem można zostać w wyniku akcji Ziomal Szakala. Zostając Ziomalem, dołącza się do drużyny Szakala.
    • Zadaniem Ziomala jest pomoc Szakalowi w zabiciu wszystkich postaci spoza drużyny Szakala.
    • Jeśli opcja *Sidekick gets promoted to Jackal on Jackal death* jest aktywna, Ziomal staje się Szakalem po śmierci Szakala.
    • Jeśli opcja *Jackals promoted from Sidekick can create a Sidekick* roli Szakal jest aktywna, Ziomal awansowany na Szakala również może użyć opcji Ziomal Szakala.
    • Postać traci swoją rolę oraz zadania, zostając Ziomalem, chyba, że jest Kochankiem albo OszuKochankiem.
    • Ziomal może zostać zabity przez Szeryfa.
    • Ziomal nie może zabić dorastającego Dobrego Malucha ani dorastającego Złego Malucha.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Ziomala.
Ustawienie *Jackal/Sidekick Kill Cooldown* jest wspólne dla ról Szakal oraz Ziomal.

> **Jackal/Sidekick Kill Cooldown**
> Czas odnowienia się akcji zabijania u Szakala oraz Ziomala.
> 
> **Sidekick gets promoted to Jackal on Jackal death**
> Czy Ziomal staje się Szakalem po śmierci Szakala.
> 
> **Sidekick can kill**
> Czy Ziomal może zabijać.
> 
> **Sidekick can use vents**
> Czy Ziomal może korzystać z otworów wentylacyjnych.`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Stuck
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_stuck.png', embed_colors.gray, 'Stuck', '• Nazwa: **Stuck** (Utknięty)\n• Drużyna: **Neutral** (Neutralna)');
		await actions.send_message(channels.tor.role, `​

**Uwaga**

    • Utknięty to rola osób, których proces ładowania gry zakończył się permanentnym czarnym ekranem.
    • Utknięty zawsze przegrywa, znacznie zmniejszając morale zarówno swoje, jak i innych graczy.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		log('Send neutral roles: Complete');
		
		// Send impostor roles
		log('Send impostor roles: Start');

		// Bounty Hunter
		roles_id.impostors['Bounty Hunter'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_bounty_hunter.png', embed_colors.red, 'Bounty Hunter', '• Nazwa: **Bounty Hunter** (Łowca Głów)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.red, 'Cel', 'Łowca Głów to oszust, który stale otrzymuje graczy jako cele do zabicia (gracze będący celami Łowcy Głów o tym nie wiedzą). Cel Łowcy Nagród zmienia się po każdym spotkaniu i po określonym czasie. Jeśli Łowca Nagród zabije swój cel, jego czas odnowienia będzie znacznie krótszy niż zwykle. Zabicie gracza, który nie jest jego aktualnym celem, skutkuje wydłużeniem czasu odnowienia zabójstwa. Jeśli opcja *Show Arrow Pointing Towards The Bounty* jest włączona, pojawi się strzałka wskazująca cel.', 'Zdolność pasywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Celem Łowcy Głów nie może być ani oszust, ani Szpieg.
    • Zabicie celu zresetuje licznik i wybrany zostanie nowy cel.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Łowcy Głów.

> **Bounty Hunter Spawn Chance**
> Szansa na pojawienie się Łowcy Głów w grze.
> 
> **Duration After Which Bounty Changes**
> Czas, po którym Cel ulega zmianie.
> 
> **Cooldown After Killing Bounty**
> Czas odnowienia się zabójstwa po zabiciu celu.
> 
> **Additional Cooldown After Killing Others**
> Dodatkowy czas po zabiciu ofiary nie będącej celem (dodawany do zwykłego czasu zabójstwa).
> 
> **Show Arrow Pointing Towards The Bounty**
> Pokazuje strzałkę na cel Łowcy Głów.
> 
> **Bounty Hunter Arrow Update Intervall**
> Jak często aktualizuje się pozycja strzałki wskazującej na cel Łowcy Głów.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Camouflager
		roles_id.impostors['Camouflager'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_camouflager.png', embed_colors.red, 'Camouflager', '• Nazwa: **Camouflager** (Kamuflażysta)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_camo.png', embed_colors.red, 'Camo (Kamuflaż)', 'Kamuflażysta włącza na określony czas swoją kamuflaż. Podczas kamuflażu, wszyskie nazwy postaci, zwierzaki oraz czapki są ukryte, a wszystkie postaci mają ten sam kolor.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Dobry Maluch albo Zły Maluch będzie wyglądać tak samo, jak wszystkie inne postaci.
    • Kolor śladów stóp zmieni się na szary (także tych, które były już na ziemi).
    • Haker będzie widział szare ikony na panelu administracyjnym.
    • Tarcza nie będzie widoczna.
    • Strzałki Śledczego oraz Kapusia wciąz będą działały.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Kamuflażysty.

> **Camouflager Spawn Chance**
> Szansa na pojawienie się Kamuflażysty w grze.
> 
> **Camouflager Cooldown**
> Czas odnowienia się umiejętności aktywnej Kamuflaż.
> 
> **Camo Duration**
> Czas trwania Kamuflażu.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Cleaner
		roles_id.impostors['Cleaner'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_cleaner.png', embed_colors.red, 'Cleaner', '• Nazwa: **Cleaner** (Sprzątacz)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_clean.png', embed_colors.red, 'Clean (Sprzątnij Ciało)', 'Sprząta martwe ciało (usuwa je z gry).', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwaga**

    • Czasy odnowienia zabijania oraz umiejętności aktywnej Sprzątnij Ciało są wspólne, co uniemożliwia Sprzątaczowi natychmiastowe czyszczenie własnych zabójstw.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Sprzątacza.

> **Cleaner Spawn Chance**
> Szansa na pojawienie się Sprzątacza w grze.
> 
> **Cleaner Cooldown**
> Czas odnowienia się umiejętności aktywnej Sprzątnij Ciało.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Eraser
		roles_id.impostors['Eraser'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_eraser.png', embed_colors.red, 'Eraser', '• Nazwa: **Eraser** (Wymazywacz)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_erase.png', embed_colors.red, 'Erase (Wymazanie)', 'Wybrana postać straci swoją rolę po spotkaniu, tuż przed wygłosowaniem gracza. Po każdym Wymazaniu czas odnowienia wydłuża się o 10 sekund. Wymazanie zostanie wykonane, nawet jeśli Wymazywacz lub jego cel zginą przed następnym spotkaniem. Wymazywacz może wymazać wszystkie role (a jeśli opcja *Eraser Can Erase Anyone* jest aktywna, to wszystkie role oprócz Szpiega i ról innych oszustów).', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Przejęcie Roli Zabieracza zawsze następuje przed Wymazaniem Wymazywacza.
    • Wymazanie roli Kochanka automatycznie wymazuje również rolę jego partnera (jeśli partnerem jest OszuKochanek, to stanie się on zwykłym oszustem).
    • Jeśli opcja *Jackals promoted from Sidekick can create a Sidekick* roli Szakal jest aktywna, Wymazanie roli Szakala uruchamia promocję Ziomala na Szkala.
    • Ponieważ Wymazanie odbywa się przed wygłosowaniem, Wymazanie oraz wygłosowanie Kochanka lub OszuKochanka nie spowoduje śmierci jego partnera.
    • Podobnie wygłosowanie i Wymazanie Błazna nie spowoduje wygranej Błazna, gdyż najpierw zostanie mu wymazana rola, a dopiero potem nastąpi jego wygłosowanie.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Wymazywacza.

> **Eraser Spawn Chance**
> Szansa na pojawienie się Wymazywacza w grze.
> 
> **Eraser Cooldown**
> Czas odnowienia się umiejętności aktywnej Wymazanie.
> 
> **Eraser Can Erase Anyone**
> Czy Wymazywacz może wymazać wszystkie role.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Evil Guesser
		roles_id.impostors['Evil Guesser'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_evil_guesser.png', embed_colors.red, 'Evil Guesser', '• Nazwa: **Evil Guesser** (Zły Zgadywacz)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.red, 'Guess (Zgadywanie)', 'Podczas spotkania Zły Zgadywacz może zgadnąć rolę gracza. Jeśli trafi, zastrzeli go. W przeciwnym razie sam zginie. Zgadywać można tyle razy w trakcie spotkania, ile wynosi wartość opcji *Guesser Number Of Shots*. Za wspólników oraz oszustów uznaje się jedynie postaci bez dodatkowych ról. Zdolności Zgadywanie używać można tylko w czasie spotkań.', 'Zdolność specjalna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Głos zastrzelonego w trakcie spotkania gracza się nie liczy.
    • Nie można odgadnąć roli Dobrego Malucha z oczywistych powodów.
    • Nie można ognadnąć roli Kochanka ani OszuKochanka. Należy odgadnąć główną rolę jednego z partnerów, by zabić ich obu.
    • Trafione Zgadywanie wobec Błazna nie spowoduje jego wygranej, jeśli zostanie zastrzelony przed wyrzuceniem.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia wspólne dla ról Dobrego Zgadywacza oraz Złego Zgadywacza.

> **Guesser Spawn Chance**
> Szansa na pojawienie się Dobrego Zgadywacza albo Złego Zgadywacza w grze.
> 
> **Chance That The Guesser Is An Impostor**
> Szansa, że pojawiający się zgadywacz będzie Złym Zgadywaczem.
> 
> **Guesser Number Of Shots**
> Liczba dostępnych Zgadnięć podczas spotkania.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Evil Mini
		roles_id.impostors['Evil Mini'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_evil_mini.png', embed_colors.red, 'Evil Mini', '• Nazwa: **Evil Mini** (Zły Maluch)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.red, 'Invincibility (Niezwyciężoność)', 'Postać Złego Malucha jest mniejsza i dlatego jest widoczna dla wszystkich w grze. Złego Malucha nie można zabić, dopóki nie dorośnie, jednak można go wygłosować. Podczas dorastania czas odnowienia zabójstwa Złego Malucha jest podwojony. Kiedy Zły Maluch dorośnie, jego czas odnowienia po zabiciu wynosi 2/3 domyślnego. Jeśli Zły Maluch zostanie wygłosowany, wszystko jest w porządku.', 'Zdolność pasywna');
		await actions.send_message(channels.tor.role, `​

**Uwaga**

    • Szeryf może zabić Złego Malucha, ale dopiero, gdy dorośnie.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia wspólne dla ról Dobry Maluch oraz Zły Maluch.

> **Mini Spawn Chance**
> Szansa na pojawienie się Dobrego Malucha (67% z tej szansy) albo Złego Malucha (33% z tej szansy) w grze.
> 
> **Mini**
> Wiek, w którym maluch dorośnie.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Godfather
		roles_id.impostors['Godfather'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_godfather.png', embed_colors.red, 'Godfather', '• Nazwa: **Godfather** (Ojciec Chrzestny)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Ojciec Chrzestny zawsze pojawia się wraz z Mafiozo oraz Woźnym w ramach Mafii oszustów.

        • Ojciec Chrzestny jest zwykłym oszustem.
        • Mafiozo jest oszustem, który nie może zabijać ani sabotować, aż do czasu śmierci Ojca Chrzestnego.
        • Woźny jest oszustem, który nie może zabijać ani sabotować, ale mogą ukrywać ciała.

    • Co najmniej trzech oszustów musi być aktywnych, aby Mafia się pojawiła w grze.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia wspólne dla ról Ojca Chrzestnego, Mafiozo oraz Woźnego.

> **Mafia Spawn Chance**
> Szansa na pojawienie się Mafii w grze.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// ImpLover
		roles_id.impostors['ImpLover'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_implover.png', embed_colors.red, 'ImpLover', '• Nazwa: **ImpLover** (OszuKochanek)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_embed(channels.tor.role, embed_colors.red, 'Love (Miłość)', 'OszuKochanek zawsze pojawia się w parze z Kochankiem. Celem OszuKochanka jest pozostanie przy życiu do końca gry. Jeśli Kochanek umrze, OszuKochanek popełni samobójstwo (jeśli opcja *Both Lovers Die* jest aktywna). OszuKochanek wie, kim jest jego partner. Partnerzy wygrywają, jeśli obaj będą żywi wśród ostatnich 3 graczy, ale mogą również wygrać swoją odpowiednią rolą. Jeśli ostatnimi 3 żywymi osobami będzie Kochanek, OszuKochanek oraz inny oszust, wówczas wygrywają jedynie partnerzy jako Solo Zwycięstwo Kochanków. Zadania Kochanka nie będą liczone do progresu paska zadań, dopóki OszuKochanek żyje.', 'Zdolność pasywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Jeśli w grze pozostanie równa liczba wspólników oraz oszustów, a wśród nich OszuKochanek, gra nie kończy się automatycznie.
       Wszak partnerzy nadal mogą odnieść Solo Zwycięstwo Kochanków. Na przykład jeśli pozostaną cztery role: Kochanek, inny wspólnik, OszuKochanek oraz inny oszust.
       Wówczas gra nie zakończy się, a następne zabójstwo zadecyduje, czy wygrywają oszuści czy partnerzy.
    • Partnerzy mogą ustalić, czy Złodziej Ról może ukraść ich role.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia wspólne dla ról Kochanek oraz OszuKochanek.

> **Lovers Spawn Chance**
> Szansa na pojawienie się Kochanka oraz jego partnera w grze.
> 
> **Chance That One Lover Is Impostor**
> Szansa, że partnerem Kochanka będzie OszuKochanek.
> 
> **Both Lovers Die**
> Czy Kochanek albo OszuKochanek popełni samobójstwo po śmierci partnera.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Janitor
		roles_id.impostors['Janitor'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_janitor.png', embed_colors.red, 'Janitor', '• Nazwa: **Janitor** (Woźny)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_clean.png', embed_colors.red, 'Clean (Sprzątnij Ciało)', 'Sprząta martwe ciało (usuwa je z gry).', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Woźny zawsze pojawia się wraz z Ojcem Chrzestnym oraz Mafiozo w ramach Mafii oszustów.

        • Ojciec Chrzestny jest zwykłym oszustem.
        • Mafiozo jest oszustem, który nie może zabijać ani sabotować, aż do czasu śmierci Ojca Chrzestnego.
        • Woźny jest oszustem, który nie może zabijać ani sabotować, ale mogą ukrywać ciała.

    • Co najmniej trzech oszustów musi być aktywnych, aby Mafia się pojawiła w grze.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Woźnego.
Ustawienie *Mafia Spawn Chance* jest wspólne dla ról Ojca Chrzestnego, Mafiozo oraz Woźnego.

> **Mafia Spawn Chance**
> Szansa na pojawienie się Mafii w grze.
> 
> **Janitor Cooldown**
> Czas odnowienia się umiejętności aktywnej Sprzątnij Ciało.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Mafioso
		roles_id.impostors['Mafioso'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_mafioso.png', embed_colors.red, 'Mafioso', '• Nazwa: **Mafioso** (Mafiozo)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Mafiozo zawsze pojawia się wraz z Ojcem Chrzestnym oraz Woźnym w ramach Mafii oszustów.

        • Ojciec Chrzestny jest zwykłym oszustem.
        • Mafiozo jest oszustem, który nie może zabijać ani sabotować, aż do czasu śmierci Ojca Chrzestnego.
        • Woźny jest oszustem, który nie może zabijać ani sabotować, ale mogą ukrywać ciała.

    • Co najmniej trzech oszustów musi być aktywnych, aby Mafia się pojawiła w grze.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia wspólne dla ról Ojca Chrzestnego, Mafiozo oraz Woźnego.

> **Mafia Spawn Chance**
> Szansa na pojawienie się Mafii w grze.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Morphling
		roles_id.impostors['Morphling'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_morphling.png', embed_colors.red, 'Morphling', '• Nazwa: **Morphling** (Zmiennokształtny)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_sample.png', embed_colors.red, 'Sample (Próbka)', 'Weź próbkę postaci.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_morph.png', embed_colors.red, 'Morph (Zmiana)', 'Na określony czas, przyjmij wygląd postaci z Próbki.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Dokonując Zmiany w Dobrego Malucha albo Złego Malucha, Zmiennokształtny przyjmie jego rozmiar.
    • Haker będzie widział nowy kolor na panelu administracyjnym.
    • Odpowiednio zmieni się kolor śladów stóp (także tych, które były już na ziemi).
    • Drugi oszust nadal będzie widział, że Zmiennokształtny jest oszustem (nazwa pozostaje czerwona).
    • Wskaźnik Tarczy Medyka odpowiednio się zmieni (Zmiennokształtny zyska lub straci wskaźnik Tarczy Medyka).
    • Strzałki Śledczego oraz Kapusia wciąz będą działały.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Zmiennokształtnego.

> **Morphling Spawn Chance**
> Szansa na pojawienie się Zmiennokształtnego w grze.
> 
> **Morphling Cooldown**
> Czas odnowienia się umiejętności aktywnej Zmiana.
> 
> **Morph Duration**
> Czas trwania Zmiany.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Trickster
		roles_id.impostors['Trickster'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_trickster.png', embed_colors.red, 'Trickster', '• Nazwa: **Trickster** (Macher)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_place_jack_in_the_box.png', embed_colors.red, 'Place Surprise (Umieść Niespodziankę)', 'Umieść pudełko z niespodzianką. Macher może umieścić do trzech pudełek, początkowo niewidocznych dla innych postaci. Gdy Macher umieści wszystkie swoje pudełka, zamienią się one w sieć wentylacyjną.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_trickster_vent.png', embed_colors.red, 'Vent Surprise (Wentylacyjna Niespodzianka)', 'Gdy tylko sieć wentylacyjna zostanie utworzona, będzie ona widoczna dla każdego. Z sieci wentylacyjnej utworzonej z pudełek z niespodzianką może korzystać jedynie Macher.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_lights_out.png', embed_colors.red, 'Lights Out (Zgaśnięcie)', 'Odkąd sieć wentylacyjna zostanie utworzona, Macher będzie mógł używać zdolności aktywnej Zgaśnięcie. Zgaśnięcie zgasza światła wszystkim nieoszustom. Przez czas trwania Zgaśnięcia, nie można ich naprawić. Światła zostaną automatycznie przywrócone, gdy czas trwania zdolności aktywnej Zgaśnięcie się skończy.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/indicator_trickster_box.gif', embed_colors.blue, 'Wskaźnik', '• Pudełko z niespodzianką używane jako otwór wentylacyjny');
		await actions.send_message(channels.tor.role, `​

**Uwaga**

    • W trakcie trwania Zgaśnięcia, gracze wcielający się w rolę oszustów będą widzieć na dole ekranu informację o trwającym Zgaśnięciu.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Machera.

> **Trickster Spawn Chance**
> Szansa na pojawienie się Machera w grze.
> 
> **Trickster Box Cooldown**
> Czas odnowienia się umiejętności aktywnej Umieść Niespodziankę.
> 
> **Trickster Lights Out Cooldown**
> Czas odnowienia się umiejętności aktywnej Zgaśnięcie.
> 
> **Trickster Lights Out Duration**
> Czas trwania Zgaśnięcia.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Vampire
		roles_id.impostors['Vampire'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_vampire.png', embed_colors.red, 'Vampire', '• Nazwa: **Vampire** (Wampir)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_bite.png', embed_colors.red, 'Bite (Ukąszenie)', 'Wampir jako oszust może kąsać inne postaci. Ukąszona postać ginie po określonym czasie. Umiejętność aktywna Ukąszenie jest dostępna wyłącznie poza obszarem działania Czosnku. Jesli opcja *Vampire Can Kill Near Garlics* jest aktywna, w obszarze działania Czosnku Wampir może użyć zwykłego zabójstwa. Jeśli wartość opcji *Vampire Spawn Chance* jest niezerowa, każdy z graczy otrzyma jeden Czosnek.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_garlic.png', embed_colors.yellow, 'Garlic (Czosnek)', 'Jeśli wartość opcji *Vampire Spawn Chance* jest niezerowa, każdy z graczy otrzyma jeden Czosnek. Czosnek można położyć tylko raz na grę. Czosnek tworzy wokół siebie obszar, w którym Wampir nie może kąsać.', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/indicator_garlic.png', embed_colors.blue, 'Wskaźniki', '• Czosnek widoczny w grze (po lewej)\n• Obszar działania Czosnku (po prawej)');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Jeśli ukąszona postać nadal żyje w momencie zwołania spotkania, umiera na jego początku.
    • Czas odnowienia się Ukąszenia jest wspólny dla zwykłego zabójstwa, lecz zwiększa się jednorazowo po Ukąszeniu.
    • Jeśli w grze jest Wampir, nie może być Czarownika.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Wampira.

> **Vampire Spawn Chance**
> Szansa na pojawienie się Wampira w grze.
> 
> **Vampire Kill Delay**
> Czas dodawany jednorazowo do czasu odnowienia się zabójstwa po Ukąszeniu.
> 
> **Vampire Cooldown**
> Czas odnowienia się podstawowego zabójstwa (dzielony z Ukąszeniem).
> 
> **Vampire Can Kill Near Garlics**
> Czy Wampir może zabijać w obszarze działania Czosnku.

​`);
		await actions.send_embed(channels.tor.role, embed_colors.blue, null, spacer_text);

		// Warlock
		roles_id.impostors['Warlock'] = (await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/role_warlock.png', embed_colors.red, 'Warlock', '• Nazwa: **Warlock** (Czarownik)\n• Drużyna: **Impostors** (Oszuści)')).body.id;
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_curse.png', embed_colors.red, 'Curse (Klątwa)', 'Nakłada klątwę na inną postać (przeklęta postać nie jest o tym informowana).', 'Zdolność aktywna');
		await actions.send_image(channels.tor.role, 'https://raw.githubusercontent.com/Benio101/ReverseClientMods/main/res/action_curse_kill.png', embed_colors.red, 'Curse Kill (Zabicie Klątwą)', 'Czarownik (bez względu na to, jak daleko się znajduje) będzie mógł zabić dowolną postać, która stanie obok tej przeklętej. Zabicie Klątwą zdejmie nałożoną klątwę, lecz spowoduje, że Czarownik nie będzie w stanie się przez pewien czas poruszać. Czarownik nadal będzie mógł dokonywać zwykłych zabójstw, lecz ich czas odnowienia jest wspólny z umiejętnością Zabicie Klątwą.', 'Zdolność aktywna');
		await actions.send_message(channels.tor.role, `​

**Uwagi**

    • Za pomocą umiejętności Zabicie Klątwą, Czarownik może zabić innych oszustów, a nawet i siebie samego.
    • Jeśli w grze jest Czarownik, nie może być Wampira.
    • Zwykłe zabójstwo nie usuwa klątwy.

​`);
		await actions.send_message(channels.tor.role, `​

**Ustawienia**
Ustawienia dla roli Czarownika.

> **Warlock Spawn Chance**
> Szansa na pojawienie się Czarownika w grze.
> 
> **Warlock Cooldown**
> Czas odnowienia się umiejętności aktywnych.
> 
> **Warlock Root Time**
> Czas, przez który Czarownik nie będzie mógł się ruszać po zabiciu umiejętnością Zabicie Klątwą.

​`);

		log('Send impostor roles: Complete');

		// Spis ról (dół)
		let crewmates = [];
		for (const [name, id] of Object.entries(roles_id.crewmates)) {
			crewmates.push(`[${name}](https://discord.com/channels/${guild_id}/${channels.tor.role}/${id})`);
		}

		let neutrals = [];
		for (const [name, id] of Object.entries(roles_id.neutrals)) {
			neutrals.push(`[${name}](https://discord.com/channels/${guild_id}/${channels.tor.role}/${id})`);
		}

		let impostors = [];
		for (const [name, id] of Object.entries(roles_id.impostors)) {
			impostors.push(`[${name}](https://discord.com/channels/${guild_id}/${channels.tor.role}/${id})`);
		}

		crewmates = `Wspólnicy\n\n${crewmates.join('\n')}`;
		neutrals = `Role neutralne\n\n${neutrals.join('\n')}`;
		impostors = `Oszuści\n\n${impostors.join('\n')}`;

		log('Send bottom toc: Start');
		await actions.send_embed(channels.tor.role, embed_colors.green, null, crewmates);
		await actions.send_embed(channels.tor.role, embed_colors.gray, null, neutrals);
		await actions.send_embed(channels.tor.role, embed_colors.red, null, impostors);
		log('Send bottom toc: Complete');

		log('Edit top toc: Start');
		await actions.edit_embed(channels.tor.role, toc_top_crewmates_id, embed_colors.green, null, crewmates);
		await actions.edit_embed(channels.tor.role, toc_top_neutrals_id, embed_colors.gray, null, neutrals);
		await actions.edit_embed(channels.tor.role, toc_top_impostors_id, embed_colors.red, null, impostors);
		log('Edit top toc: Complete');

		log('Pin top toc: Start');
		await actions.pin_message(channels.tor.role, toc_top_crewmates_id);
		await actions.pin_message(channels.tor.role, toc_top_neutrals_id);
		await actions.pin_message(channels.tor.role, toc_top_impostors_id);
		log('Pin top toc: Complete');

		log('Remove pushpins: Start');
		await actions.remove_pushpins(channels.tor.role);
		log('Remove pushpins: Complete');

		log('Update channel: Complete');
	};

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ Functions -------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	const random = (min, max) => min + (Math.max(0, max - min) * Math.random());
	const timeout = async ms => new Promise(res => setTimeout(res, ms));
	const get_current_channel_id = () => discord_actions.getChannelId();
	const get_messages = async (channel_id) => await discord_actions.getMessages(channel_id)._array;

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ Utils -----------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	const log = (...args) => console.log('%c[ReverseClientMods]', 'color: #40E040', ...args);

	// ------------------------------------------------------------------------------------------------------------
	// ------------------------------------ Main Class ------------------------------------------------------------
	// ------------------------------------------------------------------------------------------------------------

	return (([Plugin, BDFDB]) => {
		GBDFDB = BDFDB;
		return class ReverseClientMods extends Plugin {
			onLoad() {}
			onStart() {
				this.update();
				BdApi.injectCSS(config.info.name, css);
			}

			onStop() {
				BdApi.clearCSS(config.info.name, css);
			}

			update() {
				ZLibrary.PluginUpdater.checkForUpdate(config.info.name, config.info.version, config.info.updateUrl);
			}

			onChannelContextMenu(e) {
				if (e?.instance?.props?.guild?.id != guild_id)
					return;

				// TOR #role
				if (e?.instance?.props?.channel?.id == channels.tor.role) {
					let [children, index] = BDFDB.ContextMenuUtils.findItem(e.returnvalue, {id: 'devmode-copy-id', group: true});
					let contextMenuItems = [];
			////	let menuEntries = [];
			////	
			////	menuEntries.push(BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
			////		label: 'Aktualizuj treść kanału',
			////		id: 'update-tor-desc',
			////		action: _ => actions.update_tor_desc(),
			////	}));
			////	
			////	contextMenuItems.push(BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
			////		label: 'Reverse┋Mods',
			////		id: config.info.name + '-Menu-ChannelContextMenu',
			////		children: BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuGroup, {
			////			children: menuEntries,
			////		})
			////	}));
			/**/
			/**/	contextMenuItems.push(BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuItem, {
			/**/		label: 'Aktualizuj treść kanału',
			/**/		id: config.info.name + '-update-tor-desc',
			/**/		action: _ => actions.update_tor_desc(),
			/**/	}));

					children.splice(index > -1 ? index : children.length, 0, BDFDB.ContextMenuUtils.createItem(BDFDB.LibraryComponents.MenuItems.MenuGroup, {children: contextMenuItems}));
				}
			}
		};
	})(window.BDFDB_Global.PluginUtils.buildPlugin(config));
})();