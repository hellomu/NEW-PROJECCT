# VUE-SSR-TECH
# NEW-PROJECT


��vscode,��VUE-SSR-TECH�ļ��У��ڹ�������shift+�Ҽ�ѡ����������ʾ���д򿪡����Ҳ�༭���·������նˣ�Ȼ�����ն˽������²���
1.npm init(��ʼ��)
2.npm webpack@3.10 vue vue-loader
3.npm css-loader vue-template-compiler
4.�½�src�ļ��У����е���Դ���ļ������������棩
5.src���½�app.vue,index.js�����ļ�
6.app.vue,index.js�����ݼ���Ƶ
7.��Ŀ¼����webpack.config.js������path��·����ģ��,������ںͳ��ڣ�����һ�����Դ���ES6�﷨�Ĺ��ߣ���ģ������ʦ�����ڶ��δ�������룩����ϸ����Ƶ
8.package.json�ļ���scripts����������һ��"build"���ԣ�ֵΪ"webpack --config webpack.config.js",��ϸ����Ƶ
ע�⣺1.__dirname�������»��ߣ�2.�﷨������ִ��npm run build�������ֵĴ���ĵ����в鿴���и����ͷָ�ţ�

�����2
webpack
npm i style-loader url-loader file-loader stylus-loader ���Դ�����ַ�js�ļ�
ʹ�÷��� 
module:{
	rules:[
		{
			test:�ļ���׺����������ʽ,
			1.loader:����ģ�� ����
			use:[
				���ɸ�����ģ��
					options:{
							limit:1024ģ���ѡ������
						}
				]
		}
		]
	}
styl�ļ�

npm i webpack-dev-server webpack�İ���ʹ�÷����ǳ���

package.json������"webpack-dev-server --config webpack.config.js"�͡�build����һ����Ч����ר�����ڿ�������

npm i cross-env ��װ��node�����Ϳ������û��������Թ��������ֻ���

������������set:windowǰ׺/cross-env:ͨ��ǰ׺��NODE_ENV=production

npm i html-webpack-plugin ��html�ṩ�ӿ�

plugins:[
	new HTMLPlugin()
]

npm i post-css-loader(��ȫcss�����������ǰ׺�� autoprefixer�������ǰ׺�� babel-loader��ת��ES6���룩 babel-core(Babel����)
����.babelrc �������Ŀ�ĸ�Ŀ¼�¡�ʹ��Babel�ĵ�һ��.

npm i babel-preset-env babel-plugin-transform-vue-jsx
babel-preset-env �Ĺ�����ʽ���� babel-preset-latest��Ψһ��ͬ�ľ��� babel-preset-env ��������õ� env ֻ������Щ����֧�ֵ����ԡ�
babel-plugin-transform-vue-jsx���ڱ���Vue��jsx����

npm i babel-helper-vue-jsx-merge-props babel-plugin-syntax-jsx

npm i extract-text-webpack-plugin  �������CSS�ļ����ѷ�js�Ķ��������һ�������ľ�̬��Դ�ļ���